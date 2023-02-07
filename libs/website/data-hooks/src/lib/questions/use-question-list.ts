import { useQuery } from '@tanstack/react-query';

export const getQuestionListKey = () => ['question-list'];

export const useQuestionList = (quizId: string) => {
  const { data, ...rest } = useQuery(
    getQuestionListKey(),
    async () => {
      const response = await fetch(`/api/questions?quizId=${quizId}`);
      const data = await response.json();

      return data.data;
    },
    {
      enabled: !!quizId,
    }
  );

  return {
    questionList: data,
    ...rest,
  };
};
