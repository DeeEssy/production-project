import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib';

import { Text } from '../Text';

interface AppLogoProps {
  className?: string;
}

export const AppLogo = memo((props: AppLogoProps) => {
  const {
    className,
  } = props;

  const { t } = useTranslation();

  return (
    <Text
      className={classNames('', {}, [className])}
      title={t('application_name')}
    />
  );
});
