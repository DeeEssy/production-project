import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Text.module.scss';

export type TextVariant = 'primary' | 'error' | 'accent';

export type TextAlign = 'right' | 'left' | 'center';

export type TextSize = 's' | 'm' | 'l';

interface TextProps {
    className?: string;
    title?: string;
    text?: string;
    variant?: TextVariant;
    align?: TextAlign;
    size?: TextSize;
    bold?: boolean;
    'data-testid'?: string;
}

type HeaderTagType = 'h1' | 'h2' | 'h3';

const mapSizeToClass: Record<TextSize, string> = {
  s: 'size_s',
  m: 'size_m',
  l: 'size_l',
};

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
  s: 'h3',
  m: 'h2',
  l: 'h1',
};

export const Text = memo((props: TextProps) => {
  const {
    className,
    text,
    title,
    variant = 'primary',
    align = 'left',
    size = 'm',
    bold,
    'data-testid': dataTestId = 'text',
  } = props;

  const HeaderTag = mapSizeToHeaderTag[size];
  const sizeClass = mapSizeToClass[size];

  const additionalClasses = [className, cls[variant], cls[align], cls[sizeClass]];

  return (
    <div className={classNames(cls.text, { [cls.bold]: bold }, additionalClasses)} data-testid={`${dataTestId}`}>
      {title && (
        <HeaderTag
          className={cls.title}
        >
          {title}
        </HeaderTag>
      )}
      {text && (
        <p className={cls.text}>
          {text}
        </p>
      )}
    </div>
  );
});
