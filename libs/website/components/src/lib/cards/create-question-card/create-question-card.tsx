import { FC, SyntheticEvent } from 'react';
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
  onSave: (ev: SyntheticEvent) => void;
  onCancel: () => void;
}

export const CreateQuestionCard: FC<CreateQuestionCardProps> = ({
  onCancel,
  onSave,
}) => {
  const handleCancel = () => {
    onCancel();
  };

  const handleSave = (fromValue) => {
    onSave(fromValue);
  };

  return (
    <Card>
      <CardHeader>
        <h2>Create Question</h2>
      </CardHeader>
      <CardContent>
        <form action="">
          <Input placeholder="Enter Question" />

          <Input placeholder="Option 1" />

          <Input placeholder="Option 2" />

          <Input placeholder="Option 2" />

          <Input placeholder="Option 3" />
        </form>
      </CardContent>

      <CardFooter>
        <Button type="submit" onClick={(ev) => handleSave(ev.target.value)}>
          Save
        </Button>
        <Button onClick={() => handleCancel()}>Cancel</Button>
      </CardFooter>
    </Card>
  );
};
