import { FC } from 'react';
import clsx from 'clsx';
import { Answer } from '@prisma/client';

import styles from './answer-row.module.css';

interface AnswerRowProps {
  index: number;
  answer: Answer;
  isSelected: boolean;
  onAnswerSelect: (answer: Answer) => void;
}

export const AnswerRow: FC<AnswerRowProps> = ({
  index,
  answer,
  isSelected,
  onAnswerSelect,
}) => {
  return (
    <div
      className={clsx(styles['answer'], isSelected && styles['is-selected'])}
      onClick={() => onAnswerSelect(answer)}
    >
      <span className={styles['answer-number']}>{index + 1}.</span>
      <span className={styles['answer-text']}>{answer.text}</span>
    </div>
  );
};
