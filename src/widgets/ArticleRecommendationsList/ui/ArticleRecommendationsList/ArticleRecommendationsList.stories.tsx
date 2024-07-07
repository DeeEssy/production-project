import withMock from 'storybook-addon-mock';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Article } from '@/entities/Article';
import { UserRole } from '@/entities/User';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

import { ArticleRecommendationsList } from './ArticleRecommendationsList';

export default {
  title: 'widgets/ArticleRecommendationsList',
  component: ArticleRecommendationsList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [withMock],
} as ComponentMeta<typeof ArticleRecommendationsList>;

const Template: ComponentStory<typeof ArticleRecommendationsList> = (args) => <ArticleRecommendationsList {...args} />;

const article: Article = {
  id: 1,
  img: '',
  createdAt: '',
  views: 123,
  user: { id: 1, username: '123', roles: [UserRole.ADMIN] },
  blocks: [],
  type: [],
  title: '123',
  subtitle: 'asfsa',
};

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [StoreDecorator({})];
Light.parameters = {
  mockData: [
    {
      url: `${__API__}/articles?_limit=3`,
      method: 'GET',
      status: 200,
      response: [
        { ...article, id: 1 },
        { ...article, id: 2 },
        { ...article, id: 3 },
      ],
    },
  ],
};
