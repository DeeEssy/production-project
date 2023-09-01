import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib';
import cls from './NotFoundPage.module.scss';

function NotFoundPage() {
  const { t } = useTranslation();

  return <div className={classNames(cls.NotFoundPage)}>{t('not_found_page')}</div>;
}

export default NotFoundPage;
