import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import {
  useCreateQuestion,
  useDeleteQuestion,
  useQuestionList,
} from '@lite/website-data-hooks';

import styles from './quiz.module.css';
import { Card, CardHeader } from '@lite/shared-ui';
import {
  CreateQuestionCard,
  MainLayout,
  QuestionCard,
  QuestionsActions,
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
  const { deleteQuestion } = useDeleteQuestion();

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
                onDelete={() =>
                  deleteQuestion({ quizId, questionId: question.id })
                }
              />
            ))
          ) : (
            <Card>
              <CardHeader>There are no questions yet</CardHeader>
            </Card>
          )}

          {showForm && (
            <CreateQuestionCard
              onCancel={handleCancel}
              onSave={handleSave}
              isLoading={isSavingQuestion}
            />
          )}
        </div>

        <QuestionsActions
          showForm={showForm}
          setShowForm={setShowForm}
          activIndex={activIndex}
          setActivIndex={setActivIndex}
          questionListLength={questionList.length}
        />
      </div>
    </MainLayout>
  );
};

export default QuizPage;
