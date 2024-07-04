import { memo } from 'react';

import { NotificationList } from 'entities/Notification';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import NotificationIcon from 'shared/assets/icons/notification-20-20.svg';
import { Popover } from 'shared/ui/Popover/Popover';

import cls from './NotificationButton.module.scss';

interface NotificationButtonProps {
    className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
  const { className } = props;

  return (
    <Popover
      className={classNames('', {}, [className])}
      direction="bottom left"
      trigger={(
        <Button className={cls.notificationButton} theme={ThemeButton.CLEAR}>
          <Icon Svg={NotificationIcon} inverted />
        </Button>
      )}
    >
      <NotificationList className={cls.notifications} />
    </Popover>
  );
});
