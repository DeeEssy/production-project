import { classNames } from 'shared/lib';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button/Button';
import { memo } from 'react';
import cls from './ErrorBlock.module.scss';

interface ErrorBlockProps {
  className?: string;
}

export const ErrorBlock = memo(({ className }: ErrorBlockProps) => {
  const { t } = useTranslation();

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div className={classNames(cls.ErrorBlock, {}, [className])}>
      <p>{t('error_block_text')}</p>
      <Button onClick={reloadPage}>{t('error_block_btn')}</Button>
    </div>
  );
});
