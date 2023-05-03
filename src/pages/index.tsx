import { Button, Center, Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import { Session } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import BottomNav from "~/components/BottomNav";
import MenuCard from "~/components/MenuCard";
import TopNav from "~/components/TopNav";
import { getServerAuthSession } from "~/server/auth";

const Home = () => {
  const { data: session } = useSession();

  return (
    <main>
      <TopNav />

      <Flex className="w-full justify-center  space-x-5 pt-10">
        <MenuCard
          link="/text-to-image"
          bgImage="/bg-card.png"
          title="Generate AI art"
        />
        <MenuCard link="/chat-ai" bg="#00A67E" title="Chat AI" />
      </Flex>

      <Button onClick={() => signOut()}>Sign out</Button>

      <Center className="pt-5">
        {session ? (
          <h3>Your credits: {session?.user.credits}</h3>
        ) : (
          <span className="space-x-1">
            <span
              onClick={() => signIn("google")}
              className="font-semibold underline "
            >
              Sign in
            </span>
            <span>to use Draigee AI</span>
          </span>
        )}
      </Center>
      <BottomNav />
    </main>
  );
};

export async function getServerSideProps(context: any) {
  const session = await getServerAuthSession(context);

  return {
    props: {
      session: session,
    }, // will be passed to the page component as props
  };
}

export default Home;
