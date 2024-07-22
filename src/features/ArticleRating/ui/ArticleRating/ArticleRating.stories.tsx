import { ComponentStory, ComponentMeta } from '@storybook/react';

import ArticleRating from './ArticleRating';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
  title: 'features/ArticleRating',
  component: ArticleRating,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleRating>;

const Template: ComponentStory<typeof ArticleRating> = (args) => <ArticleRating {...args} />;

export const Light = Template.bind({});
Light.args = {
  id: 1,
};
Light.decorators = [
  StoreDecorator({
    user: {
      authData: { id: 1 },
    },
  }),
];
Light.parameters = {
  mockData: [
    {
      url: `${__API__}/article-ratings?userId=1&articleId=1`,
      method: 'GET',
      status: 200,
      response: [
        {
          rate: 4,
        },
      ],
    },
  ],
};

export const WithoutRate = Template.bind({});
WithoutRate.args = {
  id: 1,
};
WithoutRate.decorators = [
  StoreDecorator({
    user: {
      authData: { id: 1 },
    },
  }),
];
WithoutRate.parameters = {
  mockData: [
    {
      url: `${__API__}/article-ratings?userId=1&articleId=1`,
      method: 'GET',
      status: 200,
      response: [],
    },
  ],
};
