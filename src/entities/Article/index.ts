export { ArticleDetails } from './ui/ArticleDetails/ArticleDetails';
export { Article } from './model/types/article';
export { currentArticleReducer, currentArticleActions } from './model/slice/currentArticle';
export { ArticleDetailsSchema } from './model/types/articleDetailsSchema';
export { getCurrentArticleError } from './model/selectors/getCurrentArticleError/getCurrentArticleError';
export { getCurrentArticleData } from './model/selectors/getCurrentArticleData/getCurrentArticleData';
export { getCurrentArticleIsLoading } from './model/selectors/getCurrentArticleIsLoading/getCurrentArticleIsLoading';
