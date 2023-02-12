import { prismaClient } from '@lite/data-prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import cors from 'cors';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { quizId } = req.query as { quizId: string };

  if (req.method === 'GET') {
    const quiz = await prismaClient.quiz.findUnique({
      where: {
        id: quizId,
      },
    });

    cors()(req, res, () =>
      res.status(200).json({
        data: quiz,
      })
    );

    return;
  }

  res.status(405).json({
    message: 'Method not allowed',
  });
};

export default handler;
