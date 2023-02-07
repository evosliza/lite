import { prismaClient } from '@lite/data-prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import cors from 'cors';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { quizId } = req.query;

    const questions = await prismaClient.question.findMany({
      where: {
        quizId: {
          equals: quizId as string,
        },
      },
    });

    cors()(req, res, () =>
      res.status(200).json({
        data: questions,
      })
    );

    return;
  }

  if (req.method === 'POST') {
    const { quizId } = req.query;

    const newQuestion = await prismaClient.question.create({
      data: {
        quizId: quizId as string,
        ...req.body,
      },
    });

    cors()(req, res, () =>
      res.status(200).json({
        data: newQuestion,
      })
    );

    return;
  }

  if (req.method === 'PUT') {
    const updatedQuestion = await prismaClient.question.update({
      where: {
        id: req.body.id,
      },
      data: {
        ...req.body,
      },
    });

    cors()(req, res, () =>
      res.status(200).json({
        data: updatedQuestion,
      })
    );
    return;
  }

  if (req.method === 'DELETE') {
    const deletedQuestion = await prismaClient.question.delete({
      where: {
        id: req.body.id,
      },
    });

    cors()(req, res, () =>
      res.status(200).json({
        data: deletedQuestion,
      })
    );
    return;
  }

  res.status(405).json({
    message: 'Method not allowed',
  });
};

export default handler;
