import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib';
import { memo } from 'react';
import { Page } from 'widgets/Page/Page';
import cls from './NotFoundPage.module.scss';

const NotFoundPage = memo(() => {
  const { t } = useTranslation();

  return <Page className={classNames(cls.NotFoundPage)}>{t('not_found_page')}</Page>;
});

export default NotFoundPage;
