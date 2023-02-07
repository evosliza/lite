import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  PlusIcon,
} from '@heroicons/react/24/solid';

import { useCreateQuestion, useQuestionList } from '@lite/website-data-hooks';

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
  const {
    createQuestion,
    isLoading: isSavingQuestion,
    isSuccess,
  } = useCreateQuestion();

  const [showForm, setShowForm] = useState(false);
  const [activIndex, setActivIndex] = useState(0);

  useEffect(() => {
    if (isSuccess) {
      setShowForm(false);
      setActivIndex(questionList.length - 1);
    }
  }, [isSuccess, questionList]);

  if (isLoading) {
    return <div className={styles['loading']}>Loading...</div>;
  }

  const handleCancel = () => {
    setShowForm(false);
  };

  const handleSave = (ev) => {
    createQuestion({ quizId, questionData: ev });
  };

  return (
    <MainLayout>
      <div className={styles['page-container']}>
        <div className={styles['questions-container']}>
          {questionList.length ? (
            questionList.map((question, index) => (
              <QuestionCard
                key={question.id}
                question={question}
                index={index}
                isActive={!showForm && activIndex === index}
              />
            ))
          ) : (
            <div className={styles['empty-list']}>
              <p className={styles['empty-list-text']}>
                There are no questions yet
              </p>
            </div>
          )}

          {showForm && (
            <CreateQuestionCard
              onCancel={handleCancel}
              onSave={handleSave}
              isLoading={isSavingQuestion}
            />
          )}
        </div>

        <div className={styles['quiz-actions-container']}>
          <div className={styles['quiz-actions']}>
            <Button
              size="small"
              onClick={() => setShowForm(true)}
              disabled={showForm}
            >
              <PlusIcon className="h-4" />
              <span>Add Question</span>
            </Button>
            <Button
              onClick={() => setActivIndex(activIndex - 1)}
              disabled={showForm || activIndex === 0}
            >
              <ArrowUpIcon className="h-4" />
            </Button>
            <Button
              onClick={() => setActivIndex(activIndex + 1)}
              disabled={showForm || activIndex === questionList.length - 1}
            >
              <ArrowDownIcon className="h-4" />
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default QuizPage;
