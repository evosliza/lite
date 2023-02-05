import { prismaClient } from "@lite/data-prisma";
import { NextApiRequest, NextApiResponse } from "next";
import cors from "cors";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const quizes = await prismaClient.quiz.findMany();

    cors()(req, res, () => res.status(200).json({
      data: quizes,
    }));

    return;
  }

  // todo: we can add more methods here

  res.status(405).json({
    message: "Method not allowed",
  });
};

export default handler;
