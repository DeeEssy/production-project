import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import cls from './Text.module.scss';

export enum TextTheme {
    PRIMARY = 'primary',
    ERROR = 'error',
}

export enum TextAlign {
  RIGHT = 'right',
  LEFT = 'left',
  CENTER = 'center',
}

export enum TextSize {
  M = 'size_m',
  L = 'size_l'
}

interface TextProps {
    className?: string;
    title?: string;
    text?: string;
    size?: TextSize;
    theme?: TextTheme;
    align?: TextAlign;
}

export const Text = memo((props: TextProps) => {
  const {
    className,
    text,
    title,
    size = TextSize.M,
    theme = TextTheme.PRIMARY,
    align = TextAlign.LEFT,
  } = props;

  return (
    <div className={classNames(cls.Text, { [cls[theme]]: true, [cls[align]]: true, [cls[size]]: true }, [className])}>
      {title && <p className={cls.title}>{title}</p>}
      {text && <p className={cls.text}>{text}</p>}
    </div>
  );
});
