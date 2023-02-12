import { useQuizList } from '@lite/website-data-hooks';
import { MainLayout, QuizCard } from '@lite/website-components';

import styles from './index.module.css';

export const Index = () => {
  const { quizList = [], isLoading } = useQuizList();

  if (isLoading) {
    return <div className={styles['loading']}>Loading...</div>;
  }

  return (
    <MainLayout>
      <div className={styles['container']}>
        <div className={styles['quiz-list']}>
          {quizList.length ? (
            quizList.map((quiz) => <QuizCard quiz={quiz} key={quiz.id} />)
          ) : (
            <div className={styles['empty-list']}>
              <p className={styles['empty-list-text']}>
                There are no quizes yet
              </p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
