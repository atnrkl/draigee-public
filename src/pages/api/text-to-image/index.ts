import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "~/server/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  console.log(session);
  if (session) {
    // Signed in
    console.log("Session", JSON.stringify(session, null, 2));

    const findUser = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    if (findUser?.credits! > 0) {
      res.status(200).json("has credits:" + findUser?.credits);
    }
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
};
