import { memo } from 'react';

import ThemeIcon from '@/shared/assets/icons/theme.svg';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Icon } from '@/shared/ui/Icon';

export const ThemeSwitcher = memo(() => {
  const { toggleTheme } = useTheme();

  return (
    <Icon Svg={ThemeIcon} clickable onClick={toggleTheme} />
  );
});
