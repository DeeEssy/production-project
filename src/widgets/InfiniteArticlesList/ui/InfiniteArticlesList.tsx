import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { ArticleList } from 'entities/Article';
import { Text } from 'shared/ui/Text/Text';
import { getArticlesIsLoading } from '../model/selectors/getArticlesIsLoading/getArticlesIsLoading';
import { getNormalizeArticles } from '../model/selectors/getNormalizeArticles/getNormalizeArticles';
import { getArticlesView } from '../model/selectors/getArticlesView/getArticlesView';
import { getArticlesError } from '../model/selectors/getArticlesError/getArticlesError';

interface ArticleInfiniteListProps {
    className?: string;
}

export const InfiniteArticlesList = memo((props: ArticleInfiniteListProps) => {
  const { className } = props;
  const articles = useSelector(getNormalizeArticles.selectAll);
  const isLoading = useSelector(getArticlesIsLoading);
  const view = useSelector(getArticlesView);
  const error = useSelector(getArticlesError);
  const { t } = useTranslation();

  if (error) {
    return <Text text={t('article_error')} />;
  }

  return (
    <ArticleList
      isLoading={isLoading}
      view={view}
      articles={articles}
      className={className}
    />
  );
});
