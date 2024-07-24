import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from './Button';

export default {
  title: 'shared/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Text',
};

export const Clear = Template.bind({});
Clear.args = {
  children: 'Text',
  variant: 'clear',
};

export const Outline = Template.bind({});
Outline.args = {
  children: 'Text',
  variant: 'outline',
};

export const Square = Template.bind({});
Square.args = {
  children: '+',
  variant: 'outline',
  square: true,
};

export const SquareSizeM = Template.bind({});
SquareSizeM.args = {
  children: '+',
  variant: 'outline',
  square: true,
  size: 'm',
};

export const SquareSizeL = Template.bind({});
SquareSizeL.args = {
  children: '+',
  variant: 'outline',
  square: true,
  size: 'l',
};

export const SquareSizeXL = Template.bind({});
SquareSizeXL.args = {
  children: '+',
  variant: 'outline',
  square: true,
  size: 'xl',
};

export const SizeM = Template.bind({});
SizeM.args = {
  children: 'Text',
  variant: 'outline',
  size: 'm',
};

export const SizeL = Template.bind({});
SizeL.args = {
  children: 'Text',
  variant: 'outline',
  size: 'l',
};

export const SizeXL = Template.bind({});
SizeXL.args = {
  children: 'Text',
  variant: 'outline',
  size: 'xl',
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: 'Text',
  variant: 'outline',
  disabled: true,
};
