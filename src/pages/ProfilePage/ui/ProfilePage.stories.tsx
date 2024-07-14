import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import avatar from '@/shared/assets/tests/storybook.jpg';
import { Theme } from '@/shared/const/theme';

import ProfilePage from './ProfilePage';

const profileData = {
  firstname: 'firstName',
  lastname: 'lastName',
  age: 24,
  currency: Currency.UAH,
  country: Country.Ukraine,
  city: 'Lviv',
  username: 'username',
  avatar,
};

export default {
  title: 'pages/ProfilePage',
  component: ProfilePage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = () => <ProfilePage />;

export const Light = Template.bind({});
Light.decorators = [StoreDecorator({
  profile: {
    form: profileData,
  },
})];

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({
  profile: {
    form: profileData,
  },
})];
