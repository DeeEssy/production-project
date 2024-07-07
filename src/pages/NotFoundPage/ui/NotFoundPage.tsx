import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Page } from '@/widgets/Page';
import { classNames } from '@/shared/lib';

import cls from './NotFoundPage.module.scss';

const NotFoundPage = memo(() => {
  const { t } = useTranslation();

  return <Page className={classNames(cls.NotFoundPage)}>{t('not_found_page')}</Page>;
});

export default NotFoundPage;
