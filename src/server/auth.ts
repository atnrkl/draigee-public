import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { env } from "~/env.mjs";
import { prisma } from "~/server/db";
import Stripe from "stripe";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      credits: number;
      id: string;
      stripeCustomerId: string;
      subscriptionType: string;
      hasBoughtSubscriptionBefore: boolean;
      hasActiveSubscription: boolean;
      imageGeneration: number;
      chatGeneration: number;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    credits: number;
    stripeCustomerId: string;
    subscriptionType: string;
    hasBoughtSubscriptionBefore: boolean;
    hasActiveSubscription: boolean;
    imageGeneration: number;
    chatGeneration: number;
    // role: UserRole;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.credits = user.credits;
        session.user.stripeCustomerId = user.stripeCustomerId;
        session.user.chatGeneration = user.chatGeneration;
        session.user.hasActiveSubscription = user.hasActiveSubscription;
        session.user.hasBoughtSubscriptionBefore =
          user.hasBoughtSubscriptionBefore;
        session.user.subscriptionType = user.subscriptionType;
        session.user.imageGeneration = user.imageGeneration;
        // session.user.role = user.role; <-- put other properties on the session here
      }
      return session;
    },
  },
  events: {
    createUser: async ({ user }) => {
      const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY as string, {
        apiVersion: "2022-11-15",
      });

      await stripe.customers
        .create({
          email: user.email!,
        })
        .then(async (customer) => {
          // Use the Prisma Client to update the user in the database with their new Stripe customer ID
          return prisma.user.update({
            where: { id: user.id },
            data: {
              stripeCustomerId: customer.id,
            },
          });
        });
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
