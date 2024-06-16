import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import ProfilePage from './ProfilePage';

const profileData = {
  firstname: 'firstName',
  lastname: 'lastName',
  age: 24,
  currency: Currency.UAH,
  country: Country.Ukraine,
  city: 'Lviv',
  username: 'username',
  avatar: 'test.com/avatar',
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
    data: profileData,
  },
})];

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({
  profile: {
    data: profileData,
  },
})];
