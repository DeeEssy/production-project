import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ArticleType } from '@/entities/Article';

import { ArticleTypeTabs } from './ArticleTypeTabs';

export default {
  title: 'entities/Article/ArticleTypeTabs',
  component: ArticleTypeTabs,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleTypeTabs>;

const Template: ComponentStory<typeof ArticleTypeTabs> = (args) => <ArticleTypeTabs {...args} />;

export const Light = Template.bind({});
Light.args = { value: ArticleType.ALL };
