import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import { Modal } from './Modal';

export default {
  title: 'shared/Modal',
  component: Modal,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  isOpen: true,
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
  children: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  isOpen: true,
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];
