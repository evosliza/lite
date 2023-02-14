import { FC, useEffect, useRef, useState } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0/client';

import { Answer, Question } from '@prisma/client';

import { Button } from '@lite/shared-ui';
import { useGetQuizById } from '@lite/website-data-hooks';
import { AnswerRow } from '../../elements';

import styles from './question-card.module.css';

interface QuestionCardProps {
  question: Question;
  index: number;
  isActive: boolean;
  onDelete: () => void;
  onEdit: () => void;
  onAnswerSelect: (answer: Answer, oldAnswer: Answer | null) => void;
}

export const QuestionCard: FC<QuestionCardProps> = ({
  question,
  index,
  isActive,
  onDelete,
  onEdit,
  onAnswerSelect,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const { quizId } = router.query as { quizId: string };
  const { quiz } = useGetQuizById({ quizId });

  const { user } = useUser();
  const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null);
  const canManage = user && user.sub === quiz?.ownerId;

  useEffect(() => {
    if (isActive) {
      ref.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isActive]);

  const handleAnswerSelect = (answer: Answer) => {
    setSelectedAnswer(answer);

    onAnswerSelect(answer, selectedAnswer);
  };

  return (
    <div className={styles['container']} ref={ref}>
      <div className={styles['card']}>
        {canManage && (
          <div className={styles['actions']}>
            <Button className={styles['narrow-btn']} variant="naked">
              <PencilIcon className="h-4" onClick={() => onEdit()} />
            </Button>
            <Button className={styles['narrow-btn']} variant="naked">
              <TrashIcon className="h-4" onClick={() => onDelete()} />
            </Button>
          </div>
        )}

        <div className={styles['content']}>
          <p className={styles['question']}>
            {index + 1}.{question.question}
          </p>

          <p className={styles['description']}>{question.description}</p>
        </div>

        <div className={styles['answer-list']}>
          {question?.answers.map((answer, index) => (
            <AnswerRow
              isSelected={answer.id === selectedAnswer?.id}
              answer={answer}
              index={index}
              key={answer.id}
              onAnswerSelect={handleAnswerSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
