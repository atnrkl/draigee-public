import { Button, Flex } from "@chakra-ui/react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { BsFillPlusSquareFill } from "react-icons/bs";

type Props = {};

const TopNav = (props: Props) => {
  const { data: session, status } = useSession();
  return (
    <nav className="flex w-full flex-row items-center justify-around  border-b p-3  font-semibold ">
      <Link href={"/"}>
        <h1 className="text-2xl">Draigee</h1>
      </Link>

      <Flex className="items-center justify-center space-x-2">
        {session && session.user.credits < 100 && (
          <Link href={"/upgrade"}>
            <span className="text-md">
              Upgrade to{" "}
              <span className="rounded-lg bg-orange-500 p-1 px-2 text-white">
                Pro
              </span>
            </span>
          </Link>
        )}
        {!session && <Button onClick={() => signIn("google")}>Log in</Button>}
        {session && session.user.credits > 100 && (
          <Button size={"xs"} variant="outline" colorScheme="orange">
            PRO
          </Button>
        )}
      </Flex>
    </nav>
  );
};

export default TopNav;
