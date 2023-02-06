import { FC } from 'react';
import { Question } from '@prisma/client';

import styles from './question-card.module.css';

interface QuestionCardProps {
  question: Question;
  index: number;
}

export const QuestionCard: FC<QuestionCardProps> = ({ question, index }) => {
  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <h2>{index + 1}.{question.description}</h2>
      </div>

      <div className={styles['answer-list']}>
        {question?.answers.map((answer, index) => (
          <div>{answer.text}</div>
        ))}
      </div>
    </div>
  );
};
