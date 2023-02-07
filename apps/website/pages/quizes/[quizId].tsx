import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  PlusIcon,
} from '@heroicons/react/24/solid';

import { useQuestionList } from '@lite/website-data-hooks';

import styles from './quiz.module.css';
import { Button } from '@lite/shared-ui';
import {
  CreateQuestionCard,
  MainLayout,
  QuestionCard,
} from '@lite/website-components';

export const QuizPage: FC = () => {
  const router = useRouter();
  const { quizId } = router.query as { quizId: string };

  const { questionList, isLoading } = useQuestionList(quizId);

  const [showForm, setShowForm] = useState(false);

  if (isLoading) {
    return <div className={styles['loading']}>Loading...</div>;
  }

  const handleCancel = () => {
    setShowForm(false);
  };

  const handleSave = (ev) => {
    setShowForm(false);
    console.log('saved', ev);
  };

  return (
    <MainLayout>
      <div className={styles['page-container']}>
        <div className={styles['questions-container']}>
          {showForm ? (
            <CreateQuestionCard onCancel={handleCancel} onSave={handleSave} />
          ) : questionList.length ? (
            questionList.map((question, index) => (
              <QuestionCard
                question={question}
                index={index}
                key={question.id}
              />
            ))
          ) : (
            <div className={styles['empty-list']}>
              <p className={styles['empty-list-text']}>
                There are no questions yet
              </p>
            </div>
          )}
        </div>

        <div className={styles['quiz-footer']}>
          <div className={styles['footer-actions']}>
            <Button
              className={styles['small']}
              onClick={() => setShowForm(true)}
              disabled={showForm}
            >
              <PlusIcon className="h-4" />
              <span>Add Question</span>
            </Button>
            <Button>
              <ArrowUpIcon className="h-4" />
            </Button>
            <Button>
              <ArrowDownIcon className="h-4" />
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default QuizPage;
