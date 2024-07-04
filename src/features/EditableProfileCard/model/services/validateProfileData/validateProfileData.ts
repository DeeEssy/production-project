import { Profile } from 'entities/Profile';
import { ValidateProfileError } from '../../types/enums/validateProfileErrors';

export const validateProfileData = (profile?: Profile) => {
  if (!profile) {
    return [ValidateProfileError.NO_DATA];
  }
  const {
    firstname, lastname, age, country, currency, city, username, avatar,
  } = profile;

  const errors: ValidateProfileError[] = [];

  if (!firstname || !lastname) {
    errors.push(ValidateProfileError.INCORRECT_USER_DATA);
  }

  if (!age || !Number.isInteger(age)) {
    errors.push(ValidateProfileError.INCORRECT_AGE);
  }

  if (!country) {
    errors.push(ValidateProfileError.INCORRECT_COUNTRY);
  }

  if (!currency) {
    errors.push(ValidateProfileError.INCORRECT_CURRENCY);
  }

  if (!city) {
    errors.push(ValidateProfileError.INCORRECT_CITY);
  }

  if (!username) {
    errors.push(ValidateProfileError.INCORRECT_USERNAME);
  }

  if (!avatar) {
    errors.push(ValidateProfileError.INCORRECT_AVATAR);
  }

  return errors;
};
