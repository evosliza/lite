import { FC, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Answer, Result } from '@prisma/client';

import { Button, Card, CardContent, CardHeader } from '@lite/shared-ui';
import { useGetQuizById } from '@lite/website-data-hooks';

import styles from './finish-card.module.css';

interface FinishCardProps {
  selectedAnswers: Answer[];
  questionsCount: number;
}

export const FinishCard: FC<FinishCardProps> = ({
  selectedAnswers,
  questionsCount,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [result, setResult] = useState<Result>();

  const router = useRouter();
  const { quizId } = router.query as { quizId: string };

  const { quiz } = useGetQuizById({ quizId });

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleFinish = () => {
    const scoreSum = selectedAnswers.reduce((sum, { score }) => sum + score, 0);
    const currentResult = quiz?.results.find(
      ({ percentage }) => scoreSum / questionsCount <= percentage
    );

    setResult(currentResult);
  };

  return (
    <div
      className="flex flex-col items-start justify-center h-full w-full"
      ref={ref}
    >
      <Card>
        <CardHeader>
          {result
            ? result.text
            : 'You have answerd all the questions. Click finish to see your results.'}
        </CardHeader>

        <CardContent>
          {result && <p>{result.description}</p>}

          <Button
            size="large"
            className={styles['finish-btn']}
            onClick={handleFinish}
          >
            {/* add retake quiz button */}
            {result ? <a href="/">See other quizes</a> : <span>Finish</span>}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
