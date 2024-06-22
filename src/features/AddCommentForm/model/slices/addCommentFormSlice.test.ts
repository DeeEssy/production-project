import { AddCommentFormSchema } from '../types/addCommentForm';
import { addCommentFormReducer, addCommentFormActions } from './addCommentFormSlice';

describe('addCommentFormSlice', () => {
  test('setText', () => {
    const state: DeepPartial<AddCommentFormSchema> = {
      text: '',
    };
    expect(addCommentFormReducer(
        state as AddCommentFormSchema,
        addCommentFormActions.setText('test'),
    )).toEqual({ text: 'test' });
  });
});
