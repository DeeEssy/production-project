import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { Profile } from 'entities/Profile';
import { validateProfileData } from './validateProfileData';
import { ValidateProfileError } from '../../types/enums/validateProfileErrors';

const data: Profile = {
  id: 1,
  username: 'admin',
  age: 22,
  country: Country.Ukraine,
  lastname: 'test',
  firstname: 'test',
  city: 'test',
  currency: Currency.USD,
  avatar: 'test.png',
};

describe('validateProfileData', () => {
  test('success', async () => {
    const result = validateProfileData(data);

    expect(result).toEqual([]);
  });

  test('without firstname and lastname', async () => {
    const result = validateProfileData({ ...data, firstname: '', lastname: '' });

    expect(result).toEqual([
      ValidateProfileError.INCORRECT_USER_DATA,
    ]);
  });

  test('incorrect age', async () => {
    const result = validateProfileData({ ...data, age: undefined });

    expect(result).toEqual([
      ValidateProfileError.INCORRECT_AGE,
    ]);
  });

  test('incorrect country', async () => {
    const result = validateProfileData({ ...data, country: undefined });

    expect(result).toEqual([
      ValidateProfileError.INCORRECT_COUNTRY,
    ]);
  });

  test('incorrect currency', async () => {
    const result = validateProfileData({ ...data, currency: undefined });

    expect(result).toEqual([
      ValidateProfileError.INCORRECT_CURRENCY,
    ]);
  });

  test('incorrect city', async () => {
    const result = validateProfileData({ ...data, city: '' });

    expect(result).toEqual([
      ValidateProfileError.INCORRECT_CITY,
    ]);
  });

  test('incorrect username', async () => {
    const result = validateProfileData({ ...data, username: '' });

    expect(result).toEqual([
      ValidateProfileError.INCORRECT_USERNAME,
    ]);
  });

  test('incorrect avatar', async () => {
    const result = validateProfileData({ ...data, avatar: '' });

    expect(result).toEqual([
      ValidateProfileError.INCORRECT_AVATAR,
    ]);
  });

  test('incorrect all', async () => {
    const result = validateProfileData({});

    expect(result).toEqual([
      ValidateProfileError.INCORRECT_USER_DATA,
      ValidateProfileError.INCORRECT_AGE,
      ValidateProfileError.INCORRECT_COUNTRY,
      ValidateProfileError.INCORRECT_CURRENCY,
      ValidateProfileError.INCORRECT_CITY,
      ValidateProfileError.INCORRECT_USERNAME,
      ValidateProfileError.INCORRECT_AVATAR,
    ]);
  });
});
