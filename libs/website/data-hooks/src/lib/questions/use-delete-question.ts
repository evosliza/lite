import { Question } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getQuestionListKey } from './use-question-list';

export const getDeleteQuestionKey = (questionId: string) => [
  'question',
  questionId,
];

interface DeleteQuestionArgs {
  quizId: string;
  questionId: string;
}

export const useDeleteQuestion = () => {
  const queryClient = useQueryClient();

  const { data, mutate, mutateAsync, ...rest } = useMutation(
    async (args: DeleteQuestionArgs) => {
      const { quizId, questionId } = args;

      const response = await fetch(`/api/questions?quizId=${quizId}`, {
        method: 'DELETE',
        body: JSON.stringify({
          id: questionId,
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();

      return data.data;
    },
    {
      onSuccess: (deletedQuestion) => {
        queryClient.setQueryData(
          getQuestionListKey(),
          (oldQuestions: Question[] = []) => {
            return oldQuestions.filter(
              (question) => question.id !== deletedQuestion.id
            );
          }
        );
        queryClient.invalidateQueries(getQuestionListKey());
      },
    }
  );

  return {
    deletedQuestion: data,
    deleteQuestion: mutate,
    deleteQuestionAsync: mutateAsync,
    ...rest,
  };
};
