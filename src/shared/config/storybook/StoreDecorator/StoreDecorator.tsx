import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { currentArticleReducer } from 'entities/Article';
import { profileReducer } from 'entities/Profile';
import { addCommentFormReducer } from 'features/AddCommentForm';
import { loginReducer } from 'features/AuthByUsername';
import { articleDetailsPageReducer } from 'pages/ArticleDetailsPage';
import { articlesReducer } from 'pages/ArticlesPage';
import { ReducerList } from 'shared/lib';

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
