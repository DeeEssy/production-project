import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Theme } from '@/app/providers/ThemeProvider';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import ArticleEditPage from './ArticleEditPage';

export default {
  title: 'pages/ArticleEditPage',
  component: ArticleEditPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleEditPage>;

const Template: ComponentStory<typeof ArticleEditPage> = (args) => <ArticleEditPage {...args} />;

export const Light = Template.bind({});
Light.decorators = [StoreDecorator({})];

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];
