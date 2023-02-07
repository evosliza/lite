import { FC } from 'react';
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

import styles from './create-question-card.module.css';

interface CreateQuestionCardProps {
  onSave: (data: Partial<Question>) => void;
  onCancel: () => void;
}

export const CreateQuestionCard: FC<CreateQuestionCardProps> = ({
  onCancel,
  onSave,
}) => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
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
    <Card>
      <form onSubmit={handleSubmit(onSave)}>
        <CardHeader>Create Question</CardHeader>
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
            rules={{ required: true }}
            render={({ field }) => (
              <Input placeholder="Enter Description" {...field} />
            )}
          />

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

          <Button
            onClick={() => append({ id: genUid(), text: '', score: 0 })}
            disabled={fields.length >= 4}
            size="small"
          >
            <PlusIcon className="h-4" />
            <span>Add Answer</span>
          </Button>
        </CardContent>

        <CardFooter>
          <Button type="submit">Save</Button>
          <Button onClick={() => onCancel()}>Cancel</Button>
        </CardFooter>
      </form>
    </Card>
  );
};
