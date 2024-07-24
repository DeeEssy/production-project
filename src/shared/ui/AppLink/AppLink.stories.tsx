import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AppLink } from './AppLink';

export default {
  title: 'shared/AppLink',
  component: AppLink,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof AppLink>;

const Template: ComponentStory<typeof AppLink> = (args) => <AppLink {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Text',
  variant: 'primary',
  to: '/',
};

export const Red = Template.bind({});
Primary.args = {
  children: 'Text',
  variant: 'red',
  to: '/',
};
