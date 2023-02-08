import { FC, useEffect, useRef } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useUser } from '@auth0/nextjs-auth0/client';

import { Question } from '@prisma/client';

import { Button } from '@lite/shared-ui';

import styles from './question-card.module.css';

interface QuestionCardProps {
  question: Question;
  index: number;
  isActive: boolean;
  onDelete: () => void;
  onEdit: () => void;
}

export const QuestionCard: FC<QuestionCardProps> = ({
  question,
  index,
  isActive,
  onDelete,
  onEdit
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const { user } = useUser();

  useEffect(() => {
    if (isActive) {
      ref.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isActive]);

  return (
    <div className={styles['container']} ref={ref}>
      <div className={styles['card']}>
        {user && (
          <div className={styles['actions']}>
            <Button className={styles['narrow-btn']} variant="naked">
              <PencilIcon className="h-4" onClick={() => onEdit()} />
            </Button>
            <Button className={styles['narrow-btn']} variant="naked">
              <TrashIcon className="h-4" onClick={() => onDelete()} />
            </Button>
          </div>
        )}

        <div className={styles['header']}>
          <p className={styles['question']}>
            <span className={styles['question-number']}>{index + 1}.</span>
            <span className={styles['question-text']}>{question.question}</span>
          </p>

          <p className={styles['description']}>{question.description}</p>
        </div>

        <div className={styles['answer-list']}>
          {question?.answers.map((answer, index) => (
            <p className={styles['answer']}>
              <span className={styles['answer-number']}>{index + 1}.</span>
              <span className={styles['answer-text']}>{answer.text}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
