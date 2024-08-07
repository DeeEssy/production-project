import { ComponentStory, ComponentMeta } from '@storybook/react';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

import { ArticleComments } from './ArticleComments';

export default {
  title: 'widgets/ArticleComments',
  component: ArticleComments,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleComments>;

const Template: ComponentStory<typeof ArticleComments> = (args) => <ArticleComments {...args} />;

export const Light = Template.bind({});
Light.args = {
  id: 1,
};
Light.decorators = [StoreDecorator({})];
