import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Text } from '../Text/Text';
import { Card } from './Card';

export default {
  title: 'shared/Card',
  component: Card,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Light = Template.bind({});
Light.args = {
  // eslint-disable-next-line i18next/no-literal-string
  children: <Text title="test" text="text text" />,
};
