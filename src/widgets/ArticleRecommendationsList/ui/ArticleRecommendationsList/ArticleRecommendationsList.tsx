import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleList } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/Text';
import { VStack } from '@/shared/ui/Stack';

import { useArticleRecommendationsList } from '../../model/api/articleRecommendationsApi';

interface ArticleRecommendationsListProps {
    className?: string;
}

export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const { isLoading, data: articles, error } = useArticleRecommendationsList(5);

  if (isLoading || error || !articles?.length) {
    return null;
  }

  return (
    <VStack gap="8" className={classNames('', {}, [className])} data-testid="article-details-recommendation-list">
      <Text
        size="l"
        title={t('recommendations')}
      />
      <ArticleList
        articles={articles}
        target="_blank"
      />
    </VStack>
  );
});
