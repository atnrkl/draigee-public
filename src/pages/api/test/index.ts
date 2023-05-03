// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const asyncCall = async () => {
    const dummydata = await axios.get(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
    console.log(dummydata);
    return dummydata;
  };
  const data = asyncCall();
  console.log(data);
  res.status(200).json({ name: "John Doe" });
}
