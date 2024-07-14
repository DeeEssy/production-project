import { ComponentStory, ComponentMeta } from '@storybook/react';

import { UserRole } from '@/entities/User';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

import { Comment } from './Comment';

export default {
  title: 'entities/Comment/Comment',
  component: Comment,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Comment>;

const Template: ComponentStory<typeof Comment> = (args) => <Comment {...args} />;

export const Light = Template.bind({});
Light.args = {
  comment: {
    id: 1,
    text: 'some comment',
    user: {
      id: 1,
      username: 'username',
      roles: [UserRole.ADMIN],
      // eslint-disable-next-line max-len
      avatar: 'https://i.ytimg.com/vi/QRtoUoBgjDw/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLD9sgvZwEXEC9cWQASAGwKiRJk5sw',
    },
  },
};

export const Dark = Template.bind({});
Dark.args = {
  comment: {
    id: 1,
    text: 'some comment',
    user: {
      id: 1,
      username: 'username',
      roles: [UserRole.ADMIN],
      // eslint-disable-next-line max-len
      avatar: 'https://i.ytimg.com/vi/QRtoUoBgjDw/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLD9sgvZwEXEC9cWQASAGwKiRJk5sw',
    },
  },
};
Dark.decorators = [(ThemeDecorator(Theme.DARK))];

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
