import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import cls from './Text.module.scss';

export enum TextTheme {
    PRIMARY = 'primary',
    ERROR = 'error',
    INVERTED = 'inverted'
}

export enum TextAlign {
  RIGHT = 'right',
  LEFT = 'left',
  CENTER = 'center',
}

export enum TextSize {
  S = 'size_s',
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

type HeaderTagType = 'h1' | 'h2' | 'h3';

const mapSizeToHeaderTag : Record<TextSize, HeaderTagType> = {
  [TextSize.S]: 'h3',
  [TextSize.M]: 'h2',
  [TextSize.L]: 'h1',
};

export const Text = memo((props: TextProps) => {
  const {
    className,
    text,
    title,
    size = TextSize.M,
    theme = TextTheme.PRIMARY,
    align = TextAlign.LEFT,
    ...otherProps
  } = props;

  console.log(props);

  const HeaderTag = mapSizeToHeaderTag[size];

  return (
    <div className={classNames(cls.Text, { [cls[theme]]: true, [cls[align]]: true, [cls[size]]: true }, [className])} {...otherProps}>
      {title && <HeaderTag className={cls.title}>{title}</HeaderTag>}
      {text && <p className={cls.text}>{text}</p>}
    </div>
  );
});
