import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Stack,
  Text,
  UnorderedList,
  ListItem,
  Center,
  Tag,
  TagLabel,
} from "@chakra-ui/react";

import { BsPatchCheckFill, BsPatchMinusFill, BsPlusLg } from "react-icons/bs";
/* import { BsPlusLg } from "react-icons/bi"; */

import React, { useState } from "react";

type Props = {
  period: string;
  price: number;
  imageGenerations: number;
  chatGenerations: number;
  commercialUse: boolean;
  unlockPro: boolean;
  plan: string;
  name: string;
  priceTag: string;
};

const PlanCard = (props: Props) => {
  console.log("THIS IS PRICE TAG IN PLAN CARD", props.priceTag);

  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  const goToCheckout = async () => {
    setIsCheckoutLoading(true);
    const res = await fetch(`/api/checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        price: props.priceTag,
      },
    });
    const { redirectUrl } = await res.json();
    if (redirectUrl) {
      window.location.assign(redirectUrl);
    } else {
      setIsCheckoutLoading(false);
      console.log("Error creating checkout session");
    }
  };

  return (
    <Card maxW="sm" w="xs">
      <CardBody>
        <Stack mt="1" spacing="3">
          <Heading size="md" className="flex flex-row justify-between">
            {props.plan === "basic" && <span>Basic plan</span>}
            {props.plan === "pro" && (
              <span className="rounded-md bg-orange-500 p-1 px-2 text-white">
                Pro
              </span>
            )}
            {props.plan === "proPlus" && (
              <span className=" space-x-2">
                <span className="flex w-16 flex-row justify-center rounded-md bg-purple-700 p-1 px-2">
                  <span>Pro</span>
                  <span>
                    <BsPlusLg size={12} />
                  </span>
                </span>
              </span>
            )}

            {props.plan === "pro" && (
              <Tag size="lg" colorScheme="red" borderRadius="full">
                <TagLabel>Most Popular</TagLabel>
              </Tag>
            )}
          </Heading>
          <Text className="flex flex-col" color="blue.200" fontSize="lg">
            {props.plan === "basic" && <span>${props.price} / Month</span>}
            {props.plan === "pro" && <span>${props.price} / Month</span>}
            {props.plan === "proPlus" && <span>${props.price} / Month</span>}

            {props.period === "year" && <span>Billed yearly</span>}
          </Text>

          <UnorderedList spacing={3} as="ul" listStyleType={"none"}>
            <ListItem>
              <div className="flex flex-row items-center justify-between">
                <Text>Image Generations</Text>
                {props.plan === "basic" && (
                  <Text className="font-semibold">
                    {props.imageGenerations}
                  </Text>
                )}
                {props.plan === "pro" && (
                  <Text className="font-semibold">
                    {props.imageGenerations}
                  </Text>
                )}
                {props.plan === "proPlus" && (
                  <Text className="font-semibold">
                    {props.imageGenerations}
                  </Text>
                )}
              </div>
            </ListItem>
            <ListItem>
              <div className="flex flex-row items-center justify-between">
                <Text>Chat Generations</Text>
                {props.plan === "basic" && (
                  <Text className="font-semibold">{props.chatGenerations}</Text>
                )}
                {props.plan === "pro" && (
                  <Text className="font-semibold">{props.chatGenerations}</Text>
                )}
                {props.plan === "proPlus" && (
                  <Text className="font-semibold">{props.chatGenerations}</Text>
                )}
              </div>
            </ListItem>
            <ListItem>
              <div className="flex flex-row items-center justify-between">
                <Text>Commercial use</Text>

                {props.commercialUse ? (
                  <BsPatchCheckFill color="#039e6a" size={20} />
                ) : (
                  <BsPatchMinusFill color="#eb5d5d" size={20} />
                )}
              </div>
            </ListItem>
            <ListItem>
              <div className="flex flex-row items-center justify-between">
                <Text>Unlock Pro AI generators</Text>
                {props.unlockPro ? (
                  <BsPatchCheckFill color="#039e6a" size={20} />
                ) : (
                  <BsPatchMinusFill color="#eb5d5d" size={20} />
                )}
              </div>
            </ListItem>
          </UnorderedList>
          {props.period === "year" && (
            <Text className="font-bold">For a year</Text>
          )}
          {props.period === "month" && (
            <Text className="font-bold">For a month</Text>
          )}
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <Center className="w-full">
          <Button
            isLoading={isCheckoutLoading}
            onClick={() => {
              if (isCheckoutLoading) return;
              else goToCheckout();
            }}
            variant="solid"
            colorScheme="green"
          >
            Subscribe
          </Button>
        </Center>
      </CardFooter>
    </Card>
  );
};

export default PlanCard;
