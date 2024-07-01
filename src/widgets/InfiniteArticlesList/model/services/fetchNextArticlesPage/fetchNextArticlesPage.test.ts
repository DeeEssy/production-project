import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { ArticleSortField, ArticleType, ArticleView } from 'entities/Article';
import { fetchNextArticlesPage } from './fetchNextArticlesPage';
import { fetchArticles } from '../fetchArticles/fetchArticles';

jest.mock('../fetchArticles/fetchArticles');

describe('fetchNextArticlesPage', () => {
  test('success fetching data', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
      articles: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: false,
        hasMore: true,
        order: 'asc',
        sort: ArticleSortField.CREATED,
        search: '',
        _inited: false,
        type: ArticleType.ALL,
        view: ArticleView.SMALL,
      },
    });

    await thunk.callThunk();

    expect(thunk.dispatch).toBeCalledTimes(4);
    expect(fetchArticles).toHaveBeenCalled();
  });
  test('fetchArticles is not called', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
      articles: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: false,
        hasMore: false,
        order: 'asc',
        sort: ArticleSortField.CREATED,
        search: '',
        _inited: false,
        type: ArticleType.ALL,
        view: ArticleView.SMALL,
      },
    });

    await thunk.callThunk();

    expect(thunk.dispatch).toBeCalledTimes(2);
    expect(fetchArticles).not.toHaveBeenCalled();
  });
});
