import { useQuery } from '@tanstack/react-query';
import { apiUrl } from '../../configs';

export const getQuestionListKey = () => ['question-list'];

export const useQuestionList = (quizId: string) => {
  const { data, ...rest } = useQuery(getQuestionListKey(), async () => {
    const response = await fetch(`${apiUrl}/questions?quizId=${quizId}`);
    const data = await response.json();

    return data.data;
  });

  return {
    questionList: data,
    ...rest,
  };
};
