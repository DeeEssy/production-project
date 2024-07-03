import { ComponentStory, ComponentMeta } from '@storybook/react';

import { EditableProfileCard } from './EditableProfileCard';

export default {
  title: 'features/EditableProfileCard/EditableProfileCard',
  component: EditableProfileCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof EditableProfileCard>;

const Template: ComponentStory<typeof EditableProfileCard> = (args) => <EditableProfileCard {...args} />;

export const Light = Template.bind({});
Light.args = {

};
