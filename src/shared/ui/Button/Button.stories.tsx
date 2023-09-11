import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Button, ButtonSize, ThemeButton } from './Button';

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

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
  children: 'Text',
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Clear = Template.bind({});
Clear.args = {
  children: 'Text',
  theme: ThemeButton.CLEAR,
};

export const ClearInverted = Template.bind({});
ClearInverted.args = {
  children: 'Text',
  theme: ThemeButton.CLEAR_INVERTED,
};

export const Outline = Template.bind({});
Outline.args = {
  children: 'Text',
  theme: ThemeButton.OUTLINE,
};

export const Background = Template.bind({});
Background.args = {
  children: 'Text',
  theme: ThemeButton.BACKGROUND,
};

export const BackgroundInverted = Template.bind({});
BackgroundInverted.args = {
  children: 'Text',
  theme: ThemeButton.BACKGROUND_INVERTED,
};

export const Square = Template.bind({});
Square.args = {
  children: '+',
  theme: ThemeButton.BACKGROUND_INVERTED,
  square: true,
};

export const SquareSizeM = Template.bind({});
SquareSizeM.args = {
  children: '+',
  theme: ThemeButton.BACKGROUND_INVERTED,
  square: true,
  size: ButtonSize.M,
};

export const SquareSizeL = Template.bind({});
SquareSizeL.args = {
  children: '+',
  theme: ThemeButton.BACKGROUND_INVERTED,
  square: true,
  size: ButtonSize.L,
};

export const SquareSizeXL = Template.bind({});
SquareSizeXL.args = {
  children: '+',
  theme: ThemeButton.BACKGROUND_INVERTED,
  square: true,
  size: ButtonSize.XL,
};

export const SizeM = Template.bind({});
SizeM.args = {
  children: 'Text',
  theme: ThemeButton.BACKGROUND_INVERTED,
  size: ButtonSize.M,
};

export const SizeL = Template.bind({});
SizeL.args = {
  children: 'Text',
  theme: ThemeButton.BACKGROUND_INVERTED,
  size: ButtonSize.L,
};

export const SizeXL = Template.bind({});
SizeXL.args = {
  children: 'Text',
  theme: ThemeButton.BACKGROUND_INVERTED,
  size: ButtonSize.XL,
};
