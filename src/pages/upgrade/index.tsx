import { Stack } from "@chakra-ui/react";

import BottomNav from "~/components/BottomNav";
import TopNav from "~/components/TopNav";
import ProPlans from "./ProPlans";

type Props = {};

const UpgradeToPro = (props: Props) => {
  return (
    <Stack>
      <TopNav />
      <ProPlans />
      <BottomNav />
    </Stack>
  );
};

export default UpgradeToPro;
