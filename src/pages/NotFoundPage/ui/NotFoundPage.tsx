import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib';
import { memo } from 'react';
import cls from './NotFoundPage.module.scss';

const NotFoundPage = memo(() => {
  const { t } = useTranslation();

  return <div className={classNames(cls.NotFoundPage)}>{t('not_found_page')}</div>;
});

export default NotFoundPage;
