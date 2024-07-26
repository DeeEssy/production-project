import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/Text';
import { Icon } from '@/shared/ui/Icon';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import { Card } from '@/shared/ui/Card';
import { Avatar } from '@/shared/ui/Avatar';
import { Button } from '@/shared/ui/Button';
import { getRouteArticleDetails } from '@/shared/const/router';
import { AppImage } from '@/shared/ui/AppImage';
import { Skeleton } from '@/shared/ui/Skeleton';
import { AppLink } from '@/shared/ui/AppLink';
import { HStack, VStack } from '@/shared/ui/Stack';

import { Article } from '../../model/types/interfaces/articles';
import { ArticleBlockType, ArticleView } from '../../model/types/enums/article';
import { ArticleTextBlock } from '../../model/types/interfaces/articleBlocks';
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

  const userInfo = (
    <>
      <Avatar size={32} src={article.user.avatar} />
      <Text bold text={article.user.username} />
    </>
  );
  const views = (
    <HStack gap="8">
      <Icon Svg={EyeIcon} />
      <Text text={String(article.views)} className={cls.views} />
    </HStack>
  );

  if (view === ArticleView.BIG) {
    const textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT,
    ) as ArticleTextBlock;

    return (
      <Card
        padding="24"
        max
        data-testid="article-list-item"
        className={classNames(cls.articleListItem, {}, [
          className,
          cls[view],
        ])}
      >
        <VStack max gap="16">
          <HStack gap="8" max>
            {userInfo}
            <Text text={article.createdAt} />
          </HStack>
          <Text title={article.title} bold />
          <Text title={article.subtitle} size="s" />
          <AppImage
            fallback={<Skeleton width="100%" height={250} />}
            src={article.img}
            className={cls.img}
            alt={article.title}
          />
          {textBlock?.paragraphs && (
          <Text
            className={cls.textBlock}
            text={textBlock.paragraphs.slice(0, 2).join(' ')}
          />
          )}
          <HStack max justify="between">
            <AppLink
              target={target}
              to={getRouteArticleDetails(article.id.toString())}
            >
              <Button variant="outline">
                {t('read_more')}
              </Button>
            </AppLink>
            {views}
          </HStack>
        </VStack>
      </Card>
    );
  }

  return (
    <AppLink
      data-testid="article-list-item"
      target={target}
      to={getRouteArticleDetails(article.id.toString())}
      className={classNames(cls.articleListItem, {}, [
        className,
        cls[view],
      ])}
    >
      <Card className={cls.card} border="sm-round">
        <AppImage
          fallback={<Skeleton width={240} height={200} />}
          alt={article.title}
          src={article.img}
          className={cls.img}
        />
        <VStack className={cls.info} gap="4">
          <Text title={article.title} className={cls.title} />
          <VStack gap="4" className={cls.footer} max>
            <HStack justify="between" max>
              <Text
                text={article.createdAt}
                className={cls.date}
              />
              {views}
            </HStack>
            <HStack gap="4">{userInfo}</HStack>
          </VStack>
        </VStack>
      </Card>
    </AppLink>
  );
});
