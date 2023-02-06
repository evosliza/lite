import { FC } from 'react';
import { useRouter } from 'next/router';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/solid';

import { useQuestionList } from '@lite/website-data-hooks';

import styles from './quiz.module.css';
import { Button } from '@lite/shared-ui';
import { MainLayout, QuestionCard } from '@lite/website-components';

export const QuizPage: FC = () => {
  const router = useRouter();
  const { quizId } = router.query as { quizId: string };

  const { questionList, isLoading } = useQuestionList(quizId);

  if (isLoading) {
    return <div className={styles['loading']}>Loading...</div>;
  }

  return (
    <MainLayout>
      <div className={styles['page-container']}>
        {questionList.length ? (
          questionList.map((question, index) => (
            <QuestionCard question={question} index={index} key={question.id} />
          ))
        ) : (
          <div className={styles['empty-list']}>
            <p className={styles['empty-list-text']}>
              There are no questions yet
            </p>
          </div>
        )}

        <div className={styles['quiz-footer']}>
          <div className={styles['footer-actions']}>
            <Button className={styles['footer-action']}>
              <ArrowUpIcon className="h-3" />
            </Button>
            <Button className={styles['footer-action']}>
              <ArrowDownIcon className="h-3" />
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default QuizPage;
