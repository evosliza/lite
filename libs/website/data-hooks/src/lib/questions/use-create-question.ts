import { Question } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getQuestionListKey } from './use-question-list';

interface CreateQuestionArgs {
  quizId: string;
  questionData: Partial<Question>;
}

export const useCreateQuestion = () => {
  const queryClient = useQueryClient();
  const { data, mutate, mutateAsync, ...rest } = useMutation(
    async (args: CreateQuestionArgs) => {
      const { quizId, questionData } = args;
      const response = await fetch(`/api/questions?quizId=${quizId}`, {
        method: 'POST',
        body: JSON.stringify({
          ...questionData,
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();

      return data.data;
    },
    {
      onSuccess: (newQuestion) => {
        queryClient.setQueryData(
          getQuestionListKey(),
          (oldQuestions: Question[] = []) => {
            return [...oldQuestions, newQuestion];
          }
        );
        queryClient.invalidateQueries(getQuestionListKey());
      },
    }
  );

  return {
    createdQuestion: data,
    createQuestion: mutate,
    createQuestionAsync: mutateAsync,
    ...rest,
  };
};
