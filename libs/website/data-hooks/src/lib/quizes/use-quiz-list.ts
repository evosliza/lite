import { useQuery } from '@tanstack/react-query';

export const getQuizListKey = () => ['quizList'];

export const useQuizList = () => {
  const { data, ...rest } = useQuery(getQuizListKey(), async () => {
    const response = await fetch(`/api/quizes`);
    const data = await response.json();

    return data.data;
  });

  return {
    quizList: data,
    ...rest,
  };
};
