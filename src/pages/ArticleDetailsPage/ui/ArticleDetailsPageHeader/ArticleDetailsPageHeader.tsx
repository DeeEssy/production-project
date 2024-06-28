import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { getCurrentArticleData } from 'entities/Article';
import { getArticleCanEdit } from '../../model/selectors/getArticleCanEdit/getArticleCanEdit';
import cls from './ArticleDetailsPageHeader.module.scss';

interface ArticleDetailsPageHeaderProps {
    className?: string;
}

export const ArticleDetailsPageHeader = memo((props: ArticleDetailsPageHeaderProps) => {
  const { className } = props;
  const { t } = useTranslation('currentArticlePage');
  const navigate = useNavigate();
  const canEdit = useSelector(getArticleCanEdit);
  const article = useSelector(getCurrentArticleData);

  const onEditArticle = useCallback(() => {
    navigate(`/${RoutePath.article_details}/${article?.id}/edit`);
  }, [article?.id, navigate]);

  const onBackToList = useCallback(() => {
    navigate(`/${RoutePath.articles}`);
  }, [navigate]);

  return (
    <div className={classNames(cls.articleDetailsPageHeader, {}, [className])}>
      <Button className={cls.backButton} theme={ThemeButton.OUTLINE} onClick={onBackToList}>
        {t('back_to_articles')}
      </Button>
      {canEdit && (
        <Button
          className={cls.editBtn}
          theme={ThemeButton.OUTLINE}
          onClick={onEditArticle}
        >
          {t('edit')}
        </Button>
      )}
    </div>
  );
});
