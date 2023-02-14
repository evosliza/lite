import { FC, useEffect, useRef } from 'react';
import genUid from 'light-uid';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { Question } from '@prisma/client';

import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Input,
} from '@lite/shared-ui';

import styles from './question-form-card.module.css';

interface QuestionFormCardProps {
  isLoading?: boolean;
  selectedQuestion?: Question;
  onCancel: () => void;
  onSave: (data: Partial<Question>) => void;
}

export const QuestionFormCard: FC<QuestionFormCardProps> = ({
  isLoading,
  selectedQuestion,
  onSave,
  onCancel,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const { handleSubmit, control } = useForm({
    defaultValues: selectedQuestion || {
      question: '',
      description: '',
      answers: [
        { id: genUid(), text: '', score: 0 },
        { id: genUid(), text: '', score: 0 },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'answers',
    rules: { minLength: 2, maxLength: 4 },
  });

  return (
    <div className={styles['form-card-container']}>
      <Card className={styles['form-card']} ref={ref}>
        <form onSubmit={handleSubmit(onSave)}>
          <CardHeader className={styles['form-card-header']}>
            {selectedQuestion ? 'Update' : 'Create'} Question
          </CardHeader>

          <CardContent>
            <Controller
              name="question"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input placeholder="Enter Question" {...field} />
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Input placeholder="Enter Description" {...field} />
              )}
            />

            <Button
              onClick={() => append({ id: genUid(), text: '', score: 0 })}
              disabled={fields.length >= 4}
              size="small"
            >
              <PlusIcon className="h-4" />
              <span>Add Answer</span>
            </Button>

            {fields.map((item, index) => {
              return (
                <div key={item.id} className={styles['answer-row']}>
                  <span>Answer {index + 1}</span>
                  <Controller
                    name={`answers.${index}.text`}
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Input placeholder="Enter Answer" {...field} />
                    )}
                  />

                  <div className={styles['score-row']}>
                    <Controller
                      name={`answers.${index}.score`}
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Input
                          placeholder="Enter Score"
                          min={0}
                          max={100}
                          {...field}
                          type="number"
                        />
                      )}
                    />

                    {fields.length > 2 && (
                      <Button className={styles['narrow-btn']} variant="naked">
                        <TrashIcon
                          className="h-4"
                          onClick={() => remove(index)}
                        />
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </CardContent>

          <CardFooter className={styles['form-card-footer']}>
            <Button type="submit" disabled={isLoading}>
              Save
            </Button>

            <Button onClick={() => onCancel()}>Cancel</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
