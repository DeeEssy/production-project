import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Theme } from '@/shared/const/theme';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Text } from './Text';

export default {
  title: 'shared/Text',
  component: Text,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: 'Title lorem ipsun',
  text: 'Description Description Description Description',
};

export const Error = Template.bind({});
Error.args = {
  title: 'Title lorem ipsun',
  text: 'Description Description Description Description',
  variant: 'error',
};

export const OnlyTitle = Template.bind({});
OnlyTitle.args = {
  title: 'Title lorem ipsun',
};

export const OnlyText = Template.bind({});
OnlyText.args = {
  text: 'Description Description Description Description',
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
  title: 'Title lorem ipsun',
  text: 'Description Description Description Description',
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyTitleDark = Template.bind({});
OnlyTitleDark.args = {
  title: 'Title lorem ipsun',
};
OnlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyTextDark = Template.bind({});
OnlyTextDark.args = {
  text: 'Description Description Description Description',
};
OnlyTextDark.decorators = [ThemeDecorator(Theme.DARK)];

export const SizeS = Template.bind({});
SizeS.args = {
  title: 'Title lorem ipsun',
  text: 'Description Description Description Description',
  size: 's',
};

export const SizeM = Template.bind({});
SizeM.args = {
  title: 'Title lorem ipsun',
  text: 'Description Description Description Description',
  size: 'm',
};

export const SizeL = Template.bind({});
SizeL.args = {
  title: 'Title lorem ipsun',
  text: 'Description Description Description Description',
  size: 'l',
};
