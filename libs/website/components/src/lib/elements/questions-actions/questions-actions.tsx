import { FC } from 'react';
import { useRouter } from 'next/router';
import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowUpIcon,
  PlusIcon,
} from '@heroicons/react/24/solid';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Button } from '@lite/shared-ui';
import { useQuestionList } from '@lite/website-data-hooks';

import styles from './questions-actions.module.css';

interface QuestionsActionsProps {
  showForm: boolean;
  activIndex: number;
  setActivIndex: (value: number) => void;
  setShowForm: (value: boolean) => void;
}

export const QuestionsActions: FC<QuestionsActionsProps> = ({
  showForm,
  activIndex,
  setActivIndex,
  setShowForm,
}) => {
  const router = useRouter();
  const { quizId } = router.query as { quizId: string };

  const { questionList } = useQuestionList(quizId);
  const { user } = useUser();

  return (
    <div className={styles['quiz-actions']}>
      <a href="/">
        <Button size="small">
          <ArrowLeftIcon className="h-4" />
          <span>Back to quiz list</span>
        </Button>
      </a>

      {user && (
        <Button
          size="small"
          onClick={() => setShowForm(true)}
          disabled={showForm}
        >
          <PlusIcon className="h-4" />
          <span>Add Question</span>
        </Button>
      )}

      <Button
        onClick={() => setActivIndex(activIndex - 1)}
        disabled={showForm || activIndex === 0}
      >
        <ArrowUpIcon className="h-4" />
      </Button>

      <Button
        onClick={() => setActivIndex(activIndex + 1)}
        disabled={showForm || activIndex === questionList.length - 1}
      >
        <ArrowDownIcon className="h-4" />
      </Button>
    </div>
  );
};
