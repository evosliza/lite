import { useQuizList } from '@lite/website-data-hooks';
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@lite/shared-ui';
import { MainLayout } from '@lite/website-components';

import styles from './index.module.css';

export const Index = () => {
  const { quizList = [], isLoading } = useQuizList();

  if (isLoading) {
    return <div className={styles['loading']}>Loading...</div>;
  }

  return (
    <MainLayout>
      <div className={styles['container']}>
        <div className={styles['quiz-list']}>
          {quizList.length ? (
            quizList.map((quiz) => (
              <Card key={quiz.id}>
                <CardHeader>{quiz.title}</CardHeader>

                <CardContent>
                  <p>{quiz.description}</p>
                </CardContent>

                <CardFooter>
                  <Button>
                    <a href={`/quizes/${quiz.id}`}>Get It</a>
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className={styles['empty-list']}>
              <p className={styles['empty-list-text']}>
                There are no quizes yet
              </p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
