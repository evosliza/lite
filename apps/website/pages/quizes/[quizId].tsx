import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Answer, Question } from '@prisma/client';

import {
  useCreateQuestion,
  useDeleteQuestion,
  useQuestionList,
  useUpdateQuestion,
} from '@lite/website-data-hooks';
import { Card, CardHeader } from '@lite/shared-ui';
import {
  QuestionFormCard,
  MainLayout,
  QuestionCard,
  QuestionsActions,
  FinishCard,
} from '@lite/website-components';

import styles from './quiz.module.css';

export const QuizPage: FC = () => {
  const router = useRouter();
  const { quizId } = router.query as { quizId: string };

  const { questionList, isLoading } = useQuestionList(quizId);
  const {
    createQuestion,
    isLoading: isCreatingQuestion,
    isSuccess: isCreateSuccessful,
  } = useCreateQuestion();
  const {
    updateQuestion,
    isLoading: isUpdatingQuestion,
    isSuccess: isUpdateSuccessful,
  } = useUpdateQuestion();
  const { deleteQuestion } = useDeleteQuestion();

  const [showForm, setShowForm] = useState(false);
  const [activIndex, setActivIndex] = useState(0);
  const [selectedQuestion, setSelectedQuestion] = useState<Question>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Answer[]>([]);

  const canFinish = selectedAnswers.length === questionList?.length;

  useEffect(() => {
    if (isCreateSuccessful || isUpdateSuccessful) {
      setShowForm(false);
      setActivIndex(questionList.length - 1);
      setSelectedQuestion(null);
    }
  }, [isCreateSuccessful, isUpdateSuccessful, questionList]);

  const handleCancel = () => {
    setShowForm(false);
    setSelectedQuestion(null);
  };

  if (isLoading) {
    return <div className={styles['loading']}>Loading...</div>;
  }

  const handleAnswerSelect = (answer: Answer, oldAnswer: Answer | null) => {
    const newSelectedAnswers = selectedAnswers.filter(
      ({ id }) => id !== oldAnswer?.id
    );

    setSelectedAnswers([...newSelectedAnswers, answer]);
    setActivIndex(activIndex + 1);
  };

  const handleEdit = (question: Question) => {
    setSelectedQuestion(question);
    setShowForm(true);
  };

  const handleDelete = (questionId: string) => {
    deleteQuestion({ quizId, questionId });
  };

  const handleSave = (formData: Partial<Question>) => {
    formData.id
      ? updateQuestion({ quizId, questionData: formData })
      : createQuestion({ quizId, questionData: formData });
  };

  return (
    <MainLayout>
      <div className={styles['page-container']}>
        <div className={styles['questions-container']}>
          {questionList?.length ? (
            questionList.map((question, index) => (
              <QuestionCard
                key={question.id}
                question={question}
                index={index}
                isActive={!showForm && activIndex === index}
                onDelete={() => handleDelete(question.id)}
                onEdit={() => handleEdit(question)}
                onAnswerSelect={handleAnswerSelect}
              />
            ))
          ) : (
            <Card>
              <CardHeader>There are no questions yet</CardHeader>
            </Card>
          )}

          {canFinish && (
            <FinishCard
              selectedAnswers={selectedAnswers}
              questionsCount={questionList.length}
            />
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
          activIndex={activIndex}
          setShowForm={setShowForm}
          setActivIndex={setActivIndex}
        />
      </div>
    </MainLayout>
  );
};

export default QuizPage;
