import { memo, useEffect } from 'react';
import { classNames, DynamicModuleLoader, ReducerList } from 'shared/lib';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { TextAlign, Text } from 'shared/ui/Text/Text';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { getCurrentArticleData } from '../../model/selectors/getCurrentArticleData/getCurrentArticleData';
import { getCurrentArticleIsLoading }
  from '../../model/selectors/getCurrentArticleIsLoading/getCurrentArticleIsLoading';
import { getCurrentArticleError } from '../../model/selectors/getCurrentArticleError/getCurrentArticleError';
import { currentArticleReducer } from '../../model/slice/currentArticle';
import cls from './ArticleDetails.module.scss';
import { fetchCurrentArticle } from '../../model/services/fetchCurrentArticle/fetchCurrentArticle';

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
      <div className={classNames(cls.articleDetails, {}, [className])}>
        <Text
          align={TextAlign.CENTER}
          title={t('error_the_article_not_found')}
        />
      </div>
    );
  } else {
    content = (
      <div className={classNames(cls.articleDetails, {}, [className])}>
        {id}
      </div>
    );
  }

  return (
    <DynamicModuleLoader reducers={initialReducers} removeAfterUnMount>
      {content}
    </DynamicModuleLoader>
  );
});
