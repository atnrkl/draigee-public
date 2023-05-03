import { Button, Center, Flex, Input, Stack } from "@chakra-ui/react";

import { signIn, useSession } from "next-auth/react";
import React from "react";
import BottomNav from "~/components/BottomNav";
import TopNav from "~/components/TopNav";
import { getServerAuthSession } from "~/server/auth";

const Home = () => {
  const { data: session } = useSession();

  return (
    <main>
      <TopNav />

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

      <Stack spacing={3} alignItems="center" className="pt-5">
        <Input
          w="xs"
          placeholder="photo of a ultra realistic sailing ship"
          size="sm"
        />
        <Flex className="space-x-8">
          <Button colorScheme={"orange"}>Generate</Button>
          <Button>Random</Button>
        </Flex>
      </Stack>

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
