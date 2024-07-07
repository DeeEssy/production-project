import { Story } from '@storybook/react';

import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import { articleDetailsPageReducer } from '@/pages/ArticleDetailsPage';
import { addCommentFormReducer } from '@/features/AddCommentForm';
import { loginReducer } from '@/features/AuthByUsername';
import { profileReducer } from '@/features/EditableProfileCard';
import { articlesReducer, currentArticleReducer } from '@/entities/Article';
import { ReducerList } from '@/shared/lib';

const defaultAsyncReducers: ReducerList = {
  loginForm: loginReducer,
  profile: profileReducer,
  currentArticle: currentArticleReducer,
  articleDetailsPage: articleDetailsPageReducer,
  addCommentForm: addCommentFormReducer,
  articles: articlesReducer,
};

export const StoreDecorator = (
  state: DeepPartial<StateSchema>,
  asyncReducers?: ReducerList,
) => (StoryComponent: Story) => (
  <StoreProvider initialState={state} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}>
    <StoryComponent />
  </StoreProvider>
);
