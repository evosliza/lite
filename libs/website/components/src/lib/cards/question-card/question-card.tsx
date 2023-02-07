import { FC, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
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
}

export const QuestionCard: FC<QuestionCardProps> = ({
  question,
  index,
  isActive,
  onDelete,
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
              <PencilIcon
                className="h-4"
                onClick={() => console.log(question.id)}
              />
            </Button>
            <Button className={styles['narrow-btn']} variant="naked">
              <TrashIcon className="h-4" onClick={() => onDelete()} />
            </Button>
          </div>
        )}

        <div className={styles['header']}>
          <h2>
            {index + 1}.{question.description}
          </h2>
        </div>

        <div className={styles['answer-list']}>
          {question?.answers.map((answer, index) => (
            <div>{answer.text}</div>
          ))}
        </div>
      </div>
    </div>
  );
};
