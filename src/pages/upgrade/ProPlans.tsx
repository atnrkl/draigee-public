import { Button, ButtonGroup, Center, Flex, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import PlanCard from "./PlanCard";
import { plans } from "./plans";

type Props = {};

const ProPlans = (props: Props) => {
  const [period, setPeriod] = useState("year");
  return (
    <Flex className="w-full" pb={"10"}>
      <Center className="flex w-full flex-col space-y-5 px-4 pt-5 pb-10 ">
        <span className="space-x-2 text-2xl text-gray-200">
          <span>Upgrade to</span>
          <span className="text-orange-500">Pro</span>
        </span>
        <ButtonGroup size="md" isAttached variant="outline">
          <Button onClick={() => setPeriod("month")}>Monthly</Button>
          <Button onClick={() => setPeriod("year")}>Yearly</Button>
        </ButtonGroup>
        <Stack spacing={10}>
          {period === "year" &&
            plans.yearly.map((plan, index) => (
              <PlanCard
                period={plan.period}
                chatGenerations={plan.chatGenerations}
                commercialUse={plan.commercialUse}
                imageGenerations={plan.imageGenerations}
                plan={plan.plan}
                name={plan.name}
                price={plan.price}
                unlockPro={plan.unlockPro}
                priceTag={plan.priceTag}
                key={index}
              />
            ))}
          {period === "month" &&
            plans.monthly.map((plan, index) => (
              <PlanCard
                period={plan.period}
                chatGenerations={plan.chatGenerations}
                commercialUse={plan.commercialUse}
                imageGenerations={plan.imageGenerations}
                plan={plan.plan}
                name={plan.name}
                price={plan.price}
                unlockPro={plan.unlockPro}
                priceTag={plan.priceTag}
                key={index}
              />
            ))}
        </Stack>
      </Center>
    </Flex>
  );
};

export default ProPlans;
