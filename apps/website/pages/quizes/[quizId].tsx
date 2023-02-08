import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import {
  useCreateQuestion,
  useDeleteQuestion,
  useQuestionList,
  useUpdateQuestion,
} from '@lite/website-data-hooks';

import styles from './quiz.module.css';
import { Card, CardHeader } from '@lite/shared-ui';
import {
  QuestionFormCard,
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
    isLoading: isCreatingQuestion,
    isSuccess: isCreateSuccess,
  } = useCreateQuestion();
  const {
    updateQuestion,
    isLoading: isUpdatingQuestion,
    isSuccess: isUpdateSuccess,
  } = useUpdateQuestion();
  const { deleteQuestion } = useDeleteQuestion();

  const [showForm, setShowForm] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [activIndex, setActivIndex] = useState(0);

  useEffect(() => {
    if (isCreateSuccess || isUpdateSuccess) {
      setShowForm(false);
      setActivIndex(questionList.length - 1);
      setSelectedQuestion(null);
    }
  }, [isCreateSuccess, isUpdateSuccess, questionList]);

  if (isLoading) {
    return <div className={styles['loading']}>Loading...</div>;
  }

  const handleCancel = () => {
    setShowForm(false);
    setSelectedQuestion(null);
  };

  const handleSave = (formData) => {
    formData.id
      ? updateQuestion({ quizId, questionData: formData })
      : createQuestion({ quizId, questionData: formData });
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
                onEdit={() => {
                  setShowForm(true);
                  setSelectedQuestion(question);
                }}
              />
            ))
          ) : (
            <Card>
              <CardHeader>There are no questions yet</CardHeader>
            </Card>
          )}

          {showForm && (
              <QuestionFormCard
              selectedQuestion={selectedQuestion}
              onCancel={handleCancel}
              onSave={handleSave}
              isLoading={isCreatingQuestion || isUpdatingQuestion}
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
