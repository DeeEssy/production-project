import { ButtonHTMLAttributes, ReactNode, memo } from 'react';

import { Theme } from '@/app/providers/ThemeProvider';
import { classNames } from '@/shared/lib';
import { Mods } from '@/shared/lib/classNames/classNames';

import cls from './Button.module.scss';

export enum ThemeButton {
  CLEAR = 'clear',
  CLEAR_INVERTED = 'clearInverted',
  OUTLINE = 'outline',
  OUTLINE_RED = 'outline_red',
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'backgroundInverted'
}

export enum ButtonSize {
  M = 'size_m',
  L = 'size_l',
  XL = 'size_xl'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ThemeButton;
  square?: boolean;
  size?: ButtonSize;
  disabled?: boolean;
  children?: ReactNode;
}

export const Button = memo((props: ButtonProps) => {
  const {
    className, disabled, children, theme = Theme.DARK, square, size = ButtonSize.M, ...otherProps
  } = props;

  const mods: Mods = {
    [cls[theme]]: true,
    [cls.square]: square,
    [cls[size]]: true,
    [cls.disabled]: disabled,
  };

  return (
    <button
      className={classNames(cls.button, mods, [className])}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  );
});
