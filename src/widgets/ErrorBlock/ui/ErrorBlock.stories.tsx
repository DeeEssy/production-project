import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import { ErrorBlock } from './ErrorBlock';

export default {
  title: 'widgets/ErrorBlock',
  component: ErrorBlock,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ErrorBlock>;

const Template: ComponentStory<typeof ErrorBlock> = (args) => <ErrorBlock {...args} />;

export const Light = Template.bind({});

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];
