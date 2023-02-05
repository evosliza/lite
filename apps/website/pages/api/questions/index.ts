import { prismaClient } from "@lite/data-prisma";
import { NextApiRequest, NextApiResponse } from "next";
import cors from "cors";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { quizId } = req.query;

    const questions = await prismaClient.question.findMany({
      where: {
        quizId: {
          equals: quizId as string,
        },
      },
    });

    cors()(req, res, () => res.status(200).json({
      data: questions,
    }));

    return;
  }

  res.status(405).json({
    message: "Method not allowed",
  });
};

export default handler;
