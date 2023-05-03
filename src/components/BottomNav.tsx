import Link from "next/link";

import { FaHome, FaImage } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";
import { Box, Flex } from "@chakra-ui/react";
type Props = {};

const BottomNav = (props: Props) => {
  return (
    <nav className="fixed left-0 bottom-0 grid h-16 w-full grid-cols-3 grid-rows-1 items-center justify-center border-t bg-[#242424] shadow-md ">
      <Flex className=" items-center justify-center">
        <Link href={"/"}>
          <FaHome size={30} color={"#03C988"} />
        </Link>
      </Flex>
      <Flex className=" items-center justify-center">
        <Link href={"/explore"}>
          <BiWorld size={30} color={"#03C988"} />
        </Link>
      </Flex>
      <Flex className="items-center justify-center">
        <Link href={"/gallery"}>
          <FaImage size={30} color={"#03C988"} />
        </Link>
      </Flex>
    </nav>
  );
};

export default BottomNav;
