import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ArticleSortField } from '@/entities/Article';

import { ArticleSortSelector } from './ArticleSortSelector';

export default {
  title: 'entities/Article/ArticleSortSelector',
  component: ArticleSortSelector,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleSortSelector>;

const Template: ComponentStory<typeof ArticleSortSelector> = (args) => <ArticleSortSelector {...args} />;

export const Light = Template.bind({});
Light.args = { sort: ArticleSortField.CREATED, order: 'asc' };
