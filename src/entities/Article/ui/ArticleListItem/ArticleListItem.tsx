import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/Text';
import { Icon } from '@/shared/ui/Icon';
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg';
import { Card } from '@/shared/ui/Card';
import { Avatar } from '@/shared/ui/Avatar';
import { Button, ThemeButton } from '@/shared/ui/Button';
import { getRouteArticleDetails } from '@/shared/const/router';
import { AppImage } from '@/shared/ui/AppImage';
import { Skeleton } from '@/shared/ui/Skeleton';
import { AppLink } from '@/shared/ui/AppLink';

import { Article } from '../../model/types/interfaces/articles';
import { ArticleBlockType, ArticleView } from '../../model/types/enums/article';
import { ArticleTextBlock } from '../../model/types/interfaces/articleBlocks';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import cls from './ArticleListItem.module.scss';

interface ArticleListItemProps {
    className?: string;
    article: Article;
    view: ArticleView;
    target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo(({
  className, article, view, target,
}: ArticleListItemProps) => {
  const { t } = useTranslation();

  const types = <Text text={article.type.join(', ')} className={cls.types} />;
  const views = (
    <>
      <Text text={String(article.views)} className={cls.views} />
      <Icon Svg={EyeIcon} />
    </>
  );

  if (view === ArticleView.BIG) {
    const textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT,
    ) as ArticleTextBlock;

    return (
      <div className={classNames(cls.articleListItem, {}, [className, cls[view]])} data-testid="article-list-item">
        <Card className={cls.card}>
          <div className={cls.header}>
            <Avatar size={30} src={article.user.avatar} />
            <Text text={article.user.username} className={cls.username} />
            <Text text={article.createdAt} className={cls.date} />
          </div>
          <Text title={article.title} className={cls.title} />
          {types}
          <AppImage fallback={<Skeleton width="100%" height={250} />} src={article.img} className={cls.img} alt={article.title} />
          {textBlock && (
          <ArticleTextBlockComponent block={textBlock} className={cls.textBlock} />
          )}
          <div className={cls.footer}>
            <AppLink target={target} to={getRouteArticleDetails(article.id.toString())}>
              <Button theme={ThemeButton.OUTLINE}>
                {t('read_more')}
              </Button>
            </AppLink>
            {views}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <AppLink
      target={target}
      to={getRouteArticleDetails(article.id.toString())}
      className={classNames(cls.articleListItem, {}, [className, cls[view]])}
      data-testid="article-list-item"
    >
      <Card className={cls.card}>
        <div className={cls.imageWrapper}>
          <AppImage fallback={<Skeleton width={200} height={200} />} alt={article.title} src={article.img} className={cls.img} />
          <Text text={article.createdAt} className={cls.date} />
        </div>
        <div className={cls.infoWrapper}>
          {types}
          {views}
        </div>
        <Text text={article.title} className={cls.title} />
      </Card>
    </AppLink>
  );
});
