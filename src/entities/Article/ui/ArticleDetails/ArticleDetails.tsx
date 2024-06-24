import { memo, useCallback, useEffect } from 'react';
import { classNames, DynamicModuleLoader, ReducerList } from 'shared/lib';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { TextAlign, Text, TextSize } from 'shared/ui/Text/Text';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import EyeIcon from 'shared/assets/icons/eye-20-20.svg';
import CalendarIcon from 'shared/assets/icons/calendar-20-20.svg';
import { Icon } from 'shared/ui/Icon/Icon';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useNavigate } from 'react-router-dom';
import { getCurrentArticleData } from '../../model/selectors/getCurrentArticleData/getCurrentArticleData';
import { getCurrentArticleIsLoading }
  from '../../model/selectors/getCurrentArticleIsLoading/getCurrentArticleIsLoading';
import { getCurrentArticleError } from '../../model/selectors/getCurrentArticleError/getCurrentArticleError';
import { currentArticleReducer } from '../../model/slice/currentArticleSlice';
import cls from './ArticleDetails.module.scss';
import { fetchCurrentArticle } from '../../model/services/fetchCurrentArticle/fetchCurrentArticle';
import { ArticleBlock, ArticleBlockType } from '../../model/types/article';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

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
  const navigate = useNavigate();
  const article = useSelector(getCurrentArticleData);
  const error = useSelector(getCurrentArticleError);

  const onBackToList = useCallback(() => {
    navigate(`/${RoutePath.articles}`);
  }, [navigate]);

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
        <Button className={cls.backButton} theme={ThemeButton.OUTLINE} onClick={onBackToList}>
          {t('back_to_articles')}
        </Button>
        <div className={cls.avatarWrapper}>
          <Avatar
            size={200}
            src={article?.img}
            className={cls.avatar}
          />
        </div>
        <Text
          className={cls.title}
          title={article?.title}
          text={article?.subtitle}
          size={TextSize.L}
        />
        <div className={cls.articleInfo}>
          <Icon className={cls.icon} Svg={EyeIcon} />
          <Text text={String(article?.views)} />
        </div>
        <div className={cls.articleInfo}>
          <Icon className={cls.icon} Svg={CalendarIcon} />
          <Text text={article?.createdAt} />
        </div>
        {article?.blocks.map(renderBlock)}
      </div>
    );
  }

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      {content}
    </DynamicModuleLoader>
  );
});
