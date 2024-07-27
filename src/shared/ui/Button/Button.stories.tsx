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

export const OutlineSuccess = Template.bind({});
OutlineSuccess.args = {
  children: 'Text',
  color: 'success',
};

export const OutlineError = Template.bind({});
OutlineError.args = {
  children: 'Text',
  color: 'error',
};

export const Filled = Template.bind({});
Filled.args = {
  children: 'Text',
  variant: 'filled',
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
