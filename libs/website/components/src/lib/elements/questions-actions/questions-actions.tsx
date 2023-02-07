import { FC } from 'react';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  PlusIcon,
} from '@heroicons/react/24/solid';
import { Button } from '@lite/shared-ui';

import styles from './questions-actions.module.css';

interface QuestionsActionsProps {
  showForm: boolean;
  activIndex: number;
  questionListLength: number;
  setActivIndex: (value: number) => void;
  setShowForm: (value: boolean) => void;
}

export const QuestionsActions: FC<QuestionsActionsProps> = ({
  showForm,
  activIndex,
  questionListLength,
  setActivIndex,
  setShowForm,
}) => {
  return (
    <div className={styles['quiz-actions']}>
      <Button
        size="small"
        onClick={() => setShowForm(true)}
        disabled={showForm}
      >
        <PlusIcon className="h-4" />
        <span>Add Question</span>
      </Button>
      <Button
        onClick={() => setActivIndex(activIndex - 1)}
        disabled={showForm || activIndex === 0}
      >
        <ArrowUpIcon className="h-4" />
      </Button>
      <Button
        onClick={() => setActivIndex(activIndex + 1)}
        disabled={showForm || activIndex === questionListLength - 1}
      >
        <ArrowDownIcon className="h-4" />
      </Button>
    </div>
  );
};
