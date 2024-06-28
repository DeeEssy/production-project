import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ArticlesPageFilters } from './ArticlesPageFilter';

export default {
  title: 'pages/Articles/ArticlesPageFilters',
  component: ArticlesPageFilters,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticlesPageFilters>;

const Template: ComponentStory<typeof ArticlesPageFilters> = (args) => <ArticlesPageFilters {...args} />;

export const Light = Template.bind({});
Light.args = {};
