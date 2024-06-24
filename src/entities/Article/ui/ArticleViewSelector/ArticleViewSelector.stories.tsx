import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ArticleViewSelector } from './ArticleViewSelector';

export default {
  title: 'entrities/ArticleViewSelector',
  component: ArticleViewSelector,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleViewSelector>;

const Template: ComponentStory<typeof ArticleViewSelector> = (args) => <ArticleViewSelector {...args} />;

export const Light = Template.bind({});
Light.args = {};
