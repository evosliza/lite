import { FC } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@lite/shared-ui';

import { Quiz } from '@lite/shared-types';

interface QuizCardProps {
  quiz: Quiz;
}

export const QuizCard: FC<QuizCardProps> = ({ quiz }) => {
  const { user } = useUser();

  return (
    <Card>
      <CardHeader>{quiz.title}</CardHeader>

      <CardContent>
        <p>{quiz.description}</p>
      </CardContent>

      <CardFooter>
        <Button>
          <a href={`/quizes/${quiz.id}`}>Get It</a>
        </Button>

        {user?.sub === quiz.ownerId && <Button disabled>Edit</Button>}
      </CardFooter>
    </Card>
  );
};
