import { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { classNames, DynamicModuleLoader, ReducerList } from '@/shared/lib';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text } from '@/shared/ui/Text';
import { Skeleton } from '@/shared/ui/Skeleton';
import { Avatar } from '@/shared/ui/Avatar';
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg';
import CalendarIcon from '@/shared/assets/icons/calendar-20-20.svg';
import { Icon } from '@/shared/ui/Icon';
import { HStack, VStack } from '@/shared/ui/Stack';

import { getCurrentArticleData } from '../../model/selectors/getCurrentArticleData/getCurrentArticleData';
import { getCurrentArticleIsLoading }
  from '../../model/selectors/getCurrentArticleIsLoading/getCurrentArticleIsLoading';
import { getCurrentArticleError } from '../../model/selectors/getCurrentArticleError/getCurrentArticleError';
import { currentArticleReducer } from '../../model/slices/currentArticleSlice';
import { fetchCurrentArticle } from '../../model/services/fetchCurrentArticle/fetchCurrentArticle';
import { ArticleBlock } from '../../model/types/interfaces/articleBlocks';
import { ArticleBlockType } from '../../model/types/enums/article';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import cls from './ArticleDetails.module.scss';

interface ArticleDetailsProps {
    className?: string;
    id: number;
}

const initialReducers: ReducerList = {
  currentArticle: currentArticleReducer,
};

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
  const { className, id } = props;
  const { t } = useTranslation('currentArticlePage');
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getCurrentArticleIsLoading);
  const article = useSelector(getCurrentArticleData);
  const error = useSelector(getCurrentArticleError);

  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      dispatch(fetchCurrentArticle(id));
    }
  }, [dispatch, id]);

  const renderBlock = useCallback((block: ArticleBlock) => {
    switch (block.type) {
      case ArticleBlockType.CODE:

        return (
          <ArticleCodeBlockComponent
            key={block.id}
            block={block}
            className={cls.block}
          />
        );
      case ArticleBlockType.IMAGE:

        return (
          <ArticleImageBlockComponent
            key={block.id}
            block={block}
            className={cls.block}
          />
        );
      case ArticleBlockType.TEXT:

        return (
          <ArticleTextBlockComponent
            key={block.id}
            block={block}
            className={cls.block}
          />
        );

      default:
        return null;
    }
  }, []);

  let content: JSX.Element;

  if (isLoading) {
    content = (
      <>
        <Skeleton className={cls.avatar} width={200} height={200} border="50%" />
        <Skeleton className={cls.title} width={300} height={32} />
        <Skeleton className={cls.skeleton} width={600} height={24} />
        <Skeleton className={cls.skeleton} width="100%" height={200} />
        <Skeleton className={cls.skeleton} width="100%" height={200} />
      </>
    );
  } else if (error) {
    content = (
      <Text
        align="center"
        title={t('error_the_article_not_found')}
      />
    );
  } else {
    content = (
      <>
        <HStack max justify="center" gap="16">
          <Avatar
            size={200}
            src={article?.img}
            className={cls.avatar}
          />
        </HStack>
        <VStack gap="4" max>
          <Text
            title={article?.title}
            text={article?.subtitle}
            size="l"
          />
          <HStack gap="8" max>
            <Icon Svg={EyeIcon} />
            <Text text={String(article?.views)} />
          </HStack>
          <HStack gap="8" max>
            <Icon Svg={CalendarIcon} />
            <Text text={article?.createdAt} />
          </HStack>
        </VStack>
        {article?.blocks.map(renderBlock)}
      </>
    );
  }

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <VStack gap="16" className={classNames(cls.articleDetails, {}, [className])} data-testid="article-details-info">
        {content}
      </VStack>
    </DynamicModuleLoader>
  );
});
