import { useQuizList } from '@lite/website-data-hooks';
import { Card } from '@lite/shared-ui';
import styles from './index.module.css';

export const Index = () => {
  const { quizList = [], isLoading } = useQuizList();

  if (isLoading) {
    return <div className={styles['loading']}>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="flex flex-wrap justify-center md:justify-start">
        {quizList.length ? (
          quizList.map((quiz) => (
            <Card
              key={quiz.id}
              title={quiz.title}
              description={quiz.description}
              href={`/quiz/${quiz.id}`}
            />
          ))
        ) : (
          <div>no items yet</div>
        )}
      </div>
    </div>
  );
};

export default Index;
