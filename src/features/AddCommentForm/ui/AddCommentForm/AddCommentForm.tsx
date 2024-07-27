import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { HStack } from '@/shared/ui/Stack';
import { Card } from '@/shared/ui/Card';

import { addCommentFormActions, addCommentFormReducer } from '../../model/slices/addCommentFormSlice';
import { getAddCommentFormText } from '../../model/selectors/getAddCommentFormText/getAddCommentFormText';
import cls from './AddCommentForm.module.scss';

export interface AddCommentFormProps {
    className?: string;
    onSendComment: (text: string) => void;
}

const initialReducers: ReducerList = {
  addCommentForm: addCommentFormReducer,
};

const AddCommentForm = memo((props: AddCommentFormProps) => {
  const { className, onSendComment } = props;
  const { t } = useTranslation();
  const text = useSelector(getAddCommentFormText);
  const dispatch = useAppDispatch();

  const onCommentTextChange = useCallback((value: string) => {
    dispatch(addCommentFormActions.setText(value));
  }, [dispatch]);

  const onSendHandler = useCallback(() => {
    onSendComment(text || '');
    onCommentTextChange('');
  }, [onCommentTextChange, onSendComment, text]);

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <Card padding="24" border="sm-round" max>
        <HStack
          data-testid="add-comment-form"
          justify="between"
          max
          gap="16"
          className={classNames(
            cls.addCommentForm,
            {},
            [className],
          )}
        >
          <Input
            className={cls.input}
            placeholder={t('write_your_comment')}
            value={text}
            data-testid="add-comment-form-input"
            onChange={onCommentTextChange}
          />
          <Button
            data-testid="add-comment-form-send-button"
            onClick={onSendHandler}
          >
            {t('send_comment')}
          </Button>
        </HStack>
      </Card>
    </DynamicModuleLoader>
  );
});

export default AddCommentForm;
