import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Profile } from '@/entities/Profile';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import { $api } from '@/shared/api/api';
import { ComponentRender } from '@/shared/lib/tests/componentRender/componentRender';

import { profileReducer } from '../../model/slice/profileSlice';
import { EditableProfileCard } from './EditableProfileCard';
import { ValidateProfileError } from '../../model/types/enums/validateProfileErrors';

const profile: Profile = {
  id: 1,
  firstname: 'admin',
  lastname: 'admin',
  age: 46,
  currency: Currency.USD,
  country: Country.Germany,
  city: 'Lviv',
  username: 'admin',
  avatar: 'avatar.png',
};

const options = {
  initialState: {
    profile: {
      readonly: true,
      data: profile,
      form: profile,
    },
    user: {
      authData: { id: 1, username: 'admin' },
    },
  },
  asyncReducers: {
    profile: profileReducer,
  },
};

describe('EditableProfileCard', () => {
  test('Test change readonly', async () => {
    ComponentRender(<EditableProfileCard id={1} />, options);
    await userEvent.click(screen.getByTestId('profile-card-edit-btn'));
    expect(screen.getByTestId('profile-card-undo-btn')).toBeInTheDocument();
  });

  test('Test undo changes inside inputs', async () => {
    ComponentRender(<EditableProfileCard id={1} />, options);
    const firstnameInput = screen.getByTestId('profile-card-firstname');
    const lastnameInput = screen.getByTestId('profile-card-lastname');
    const editBtn = screen.getByTestId('profile-card-edit-btn');

    await userEvent.click(editBtn);

    await userEvent.clear(firstnameInput);
    await userEvent.clear(lastnameInput);

    await userEvent.type(firstnameInput, 'user');
    await userEvent.type(lastnameInput, 'user');

    expect(firstnameInput).toHaveValue('user');
    expect(lastnameInput).toHaveValue('user');

    await userEvent.click(screen.getByTestId('profile-card-undo-btn'));

    expect(firstnameInput).toHaveValue('admin');
    expect(lastnameInput).toHaveValue('admin');
  });

  test('Test error should appear', async () => {
    ComponentRender(<EditableProfileCard id={1} />, options);
    const editBtn = screen.getByTestId('profile-card-edit-btn');
    const firstnameInput = screen.getByTestId('profile-card-firstname');

    await userEvent.click(editBtn);

    const saveBtn = screen.getByTestId('profile-card-save-btn');

    await userEvent.clear(firstnameInput);

    await userEvent.click(saveBtn);

    expect(screen.getByTestId(`profile-card-error.${ValidateProfileError.INCORRECT_USER_DATA}`)).toBeInTheDocument();
  });

  test('Test sending data', async () => {
    const mockPutReq = jest.spyOn($api, 'put');
    ComponentRender(<EditableProfileCard id={1} />, options);
    const editBtn = screen.getByTestId('profile-card-edit-btn');
    const firstnameInput = screen.getByTestId('profile-card-firstname');

    await userEvent.click(editBtn);

    await userEvent.type(firstnameInput, 'user');

    const saveBtn = screen.getByTestId('profile-card-save-btn');

    await userEvent.click(saveBtn);

    expect(mockPutReq).toHaveBeenCalled();
  });
});
