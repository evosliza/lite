import { Question } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getQuestionListKey } from './use-question-list';

export const getUpdateQuestionKey = (questionId: string) => [
  'question',
  questionId,
];

interface UpdateQuestionArgs {
  quizId: string;
  questionData: Partial<Question>;
}

export const useUpdateQuestion = () => {
  const queryClient = useQueryClient();

  const { data, mutate, mutateAsync, ...rest } = useMutation(
    async (args: UpdateQuestionArgs) => {
      const { quizId, questionData } = args;

      const response = await fetch(`/api/questions?quizId=${quizId}`, {
        method: 'PUT',
        body: JSON.stringify({
          ...questionData,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      return data.data;
    },
    {
      onSuccess: (updatedQuestion) => {
        queryClient.setQueryData(
          getQuestionListKey(),
          (oldQuestions: Question[] = []) => {
            return oldQuestions.map((question) =>
              question.id === updatedQuestion.id ? updatedQuestion : question
            );
          }
        );
        queryClient.invalidateQueries(getQuestionListKey());
      },
    }
  );

  return {
    updatedQuestion: data,
    updateQuestion: mutate,
    updateQuestionAsync: mutateAsync,
    ...rest,
  };
};
