import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

import { Input } from './Input';

export default {
  title: 'shared/Input',
  component: Input,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  placeholder: 'Type here...',
  value: '12312312',
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
  placeholder: 'Type here...',
  value: '12312312',
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];
