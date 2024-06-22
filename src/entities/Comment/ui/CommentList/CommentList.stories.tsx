import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { UserRole } from 'entities/User';
import { CommentList } from './CommentList';

export default {
  title: 'entities/Comment/CommentList',
  component: CommentList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CommentList>;

const Template: ComponentStory<typeof CommentList> = (args) => <CommentList {...args} />;

export const Light = Template.bind({});
Light.args = {
  comments: [
    {
      id: 1,
      text: 'hello world',
      user: {
        id: 1,
        username: 'test',
        role: UserRole.ADMIN,
        // eslint-disable-next-line max-len
        avatar: 'https://i.ytimg.com/vi/QRtoUoBgjDw/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLD9sgvZwEXEC9cWQASAGwKiRJk5sw',
      },
    },
    {
      id: 2,
      text: 'Comment 2',
      user: {
        id: 2,
        username: 'test 2',
        role: UserRole.USER,
        // eslint-disable-next-line max-len
        avatar: 'https://i.ytimg.com/vi/QRtoUoBgjDw/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLD9sgvZwEXEC9cWQASAGwKiRJk5sw',
      },
    },
  ],
};

export const Loading = Template.bind({});
Loading.args = {
  comments: [],
  isLoading: true,
};
