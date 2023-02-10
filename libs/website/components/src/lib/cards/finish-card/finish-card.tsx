import { FC, useEffect, useRef } from 'react';

import { Button, Card, CardContent, CardHeader } from '@lite/shared-ui';
import { Answer } from '@prisma/client';

import styles from './finish-card.module.css';

interface FinishCardProps {
  selectedAnswers: Answer[];
}

export const FinishCard: FC<FinishCardProps> = ({ selectedAnswers }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleFinish = () => {
    console.log(selectedAnswers);
  };

  return (
    <div
      className="flex flex-col items-start justify-center h-full w-full"
      ref={ref}
    >
      <Card>
        <CardHeader>
          You have answerd all the questions. Click finish to see your results.
        </CardHeader>

        <CardContent>
          <Button
            size="large"
            className={styles['finish-btn']}
            onClick={handleFinish}
          >
            <span>Finish</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
