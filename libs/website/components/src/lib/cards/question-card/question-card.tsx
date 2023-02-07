import { FC, useEffect, useRef } from 'react';
import { Question } from '@prisma/client';

import styles from './question-card.module.css';

interface QuestionCardProps {
  question: Question;
  index: number;
  isActive: boolean;
}

export const QuestionCard: FC<QuestionCardProps> = ({
  question,
  index,
  isActive,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive) {
      ref.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isActive]);

  return (
    <div className={styles['container']} ref={ref}>
      <div className={styles['card']}>
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
