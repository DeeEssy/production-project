import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { Page } from '@/widgets/Page';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './ArticleEditPage.module.scss';

interface ArticleEditPageProps {
    className?: string;
}

const ArticleEditPage = memo((props: ArticleEditPageProps) => {
  const { className } = props;
  const { t } = useTranslation('articleEditPage');
  const { id } = useParams<{id: string}>();
  const isEdit = Boolean(id);

  return (
    <Page className={classNames(cls.articleEditPage, {}, [className])}>
      {isEdit
        ? t('article_edit') + id
        : t('article_create')}
    </Page>
  );
});

export default ArticleEditPage;
