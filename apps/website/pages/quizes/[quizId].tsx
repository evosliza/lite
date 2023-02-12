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
  FinishCard,
} from '@lite/website-components';
import { Answer, Question } from '@prisma/client';

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

  const [selectedQuestion, setSelectedQuestion] = useState<Question>(null);
  const [activIndex, setActivIndex] = useState(0);

  const [selectedAnswers, setSelectedAnswers] = useState<Answer[]>([]);

  const canFinish = selectedAnswers.length === questionList?.length;

  useEffect(() => {
    if (isCreateSuccess || isUpdateSuccess) {
      setShowForm(false);
      setActivIndex(questionList.length - 1);
      setSelectedQuestion(null);
    }
  }, [isCreateSuccess, isUpdateSuccess, questionList]);

  const handleCancel = () => {
    setShowForm(false);
    setSelectedQuestion(null);
  };

  const handleSave = (formData) => {
    formData.id
      ? updateQuestion({ quizId, questionData: formData })
      : createQuestion({ quizId, questionData: formData });
  };

  if (isLoading) {
    return <div className={styles['loading']}>Loading...</div>;
  }

  const handleAnswerSelect = (answer: Answer, oldAnswer: Answer | null) => {
    const newSelectedAnswers = selectedAnswers.filter(
      (a) => a.id !== oldAnswer?.id
    );

    setSelectedAnswers([...newSelectedAnswers, answer]);

    setActivIndex(activIndex + 1);
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
                onAnswerSelect={handleAnswerSelect}
              />
            ))
          ) : (
            <Card>
              <CardHeader>There are no questions yet</CardHeader>
            </Card>
          )}

          {canFinish && <FinishCard selectedAnswers={selectedAnswers} questionsCount={questionList.length} />}

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
          activIndex={activIndex}
          setShowForm={setShowForm}
          setActivIndex={setActivIndex}
        />
      </div>
    </MainLayout>
  );
};

export default QuizPage;
