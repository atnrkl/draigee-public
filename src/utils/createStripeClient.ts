import Stripe from "stripe";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
type Props = {
  email: string;
};

async function createCustomer(props: Props) {
  const customer = await stripe.customers.create({
    email: props.email,
  });
  console.log(customer);
}

const session = await stripe.checkout.sessions.create({
  payment_method_types: ["card"],
  line_items: [
    {
      name: "My Product",
      description: "A description of my product",
      amount: 1000, // 10.00 USD in cents
      currency: "usd",
      quantity: 1,
    },
  ],
  success_url: "http://localhost:3000/success",
  cancel_url: "http://localhost:3000/cancel",
});

export default createCustomer;
