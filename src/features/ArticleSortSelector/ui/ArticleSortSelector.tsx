import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleSortField } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { SelectOption } from '@/shared/ui/Select';
import { SortOrder } from '@/shared/types/sort';
import { Text } from '@/shared/ui/Text';
import { ListBox } from '@/shared/ui/ListBox';
import { VStack } from '@/shared/ui/Stack';

import cls from './ArticleSortSelector.module.scss';

interface ArticleSortSelectorProps {
    className?: string;
    sort: ArticleSortField;
    order: SortOrder;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSort: (newSort: ArticleSortField) => void;

}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
  const {
    className, onChangeOrder, onChangeSort, order, sort,
  } = props;
  const { t } = useTranslation();

  const orderOptions = useMemo<SelectOption<SortOrder>[]>(() => [
    {
      value: 'asc',
      content: t('increasing'),
    },
    {
      value: 'desc',
      content: t('decreasing'),
    },
  ], [t]);

  const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(() => [
    {
      value: ArticleSortField.CREATED,
      content: t('created_date'),
    },
    {
      value: ArticleSortField.TITLE,
      content: t('title'),
    },
    {
      value: ArticleSortField.VIEWS,
      content: t('views'),
    },
  ], [t]);

  return (
    <div
      className={classNames(
        cls.articleSortSelector,
        {},
        [className],
      )}
    >
      <VStack gap="8">
        <Text text={t('sort_by')} />
        <ListBox
          items={sortFieldOptions}
          value={sort}
          onChange={onChangeSort}
        />
        <ListBox
          items={orderOptions}
          value={order}
          onChange={onChangeOrder}
        />
      </VStack>
    </div>
  );
});
