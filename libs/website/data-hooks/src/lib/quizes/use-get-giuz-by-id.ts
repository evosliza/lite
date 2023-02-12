import { useQuery } from '@tanstack/react-query';
import { Quiz } from '@prisma/client';

export const getQuizByIdKey = (quizId: string) => ['quiz', quizId];

interface GetQuizByIdInput {
  quizId: string;
}

export const useGetQuizById = ({ quizId }: GetQuizByIdInput) => {
  const { data, ...rest } = useQuery(getQuizByIdKey(quizId), async () => {
    const response = await fetch(`/api/quizes/${quizId}`);
    const data = await response.json();

    return data.data as Quiz;
  });

  return {
    quiz: data,
    ...rest,
  };
};
