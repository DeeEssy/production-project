import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Currency, CurrencySelect } from '@/entities/Currency';
import { Country, CountrySelect } from '@/entities/Country';
import { classNames } from '@/shared/lib';
import { Input } from '@/shared/ui/Input/Input';
import { Text, TextAlign, TextTheme } from '@/shared/ui/Text/Text';
import { Loader } from '@/shared/ui/Loader/Loader';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { HStack, VStack } from '@/shared/ui/Stack';

import { Profile } from '../../model/types/profile';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
    className?: string;
    data?: Profile;
    isLoading?: boolean;
    error?: string;
    readonly?: boolean;
    onChangeFirstname?: (value: string) => void;
    onChangeLastname?: (value: string) => void;
    onChangeAge?: (value: string) => void;
    onChangeCity?: (value: string) => void;
    onChangeAvatar?: (value: string) => void;
    onChangeUsername?: (value: string) => void;
    onChangeCurrency?: (value: Currency) => void;
    onChangeCountry?: (value: Country) => void;
}

export const ProfileCard = memo(({
  className, data, isLoading, readonly, error, onChangeFirstname, onChangeLastname, onChangeAge,
  onChangeCity, onChangeAvatar, onChangeUsername, onChangeCurrency, onChangeCountry,
}: ProfileCardProps) => {
  const { t } = useTranslation('profilePage');

  if (isLoading) {
    return (
      <HStack justify="center" max className={classNames(cls.profileCard, { [cls.loading]: true }, [className])}>
        <Loader />
      </HStack>
    );
  }

  if (error) {
    return (
      <HStack justify="center" max className={classNames(cls.profileCard, {}, [className, cls.error])}>
        <Text
          theme={TextTheme.ERROR}
          title={t('error_downloading_profile')}
          text={t('error_try_reload_page')}
          align={TextAlign.CENTER}
        />
      </HStack>
    );
  }

  return (
    <VStack max gap="16" className={classNames(cls.profileCard, { [cls.editing]: !readonly }, [className])}>
      {data?.avatar && (
        <HStack max justify="center">
          <Avatar src={data?.avatar} />
        </HStack>
      )}
      <Input
        value={data?.firstname}
        onChange={onChangeFirstname}
        placeholder={t('your_firstname')}
        className={cls.input}
        readonly={readonly}
        data-testid="profile-card-firstname"
      />
      <Input
        value={data?.lastname}
        onChange={onChangeLastname}
        placeholder={t('your_lastname')}
        className={cls.input}
        readonly={readonly}
        data-testid="profile-card-lastname"
      />
      <Input
        type="number"
        value={data?.age}
        onChange={onChangeAge}
        placeholder={t('your_age')}
        className={cls.input}
        readonly={readonly}
      />
      <Input
        value={data?.city}
        onChange={onChangeCity}
        placeholder={t('your_city')}
        className={cls.input}
        readonly={readonly}
      />
      <Input
        value={data?.username}
        onChange={onChangeUsername}
        placeholder={t('your_username')}
        className={cls.input}
        readonly={readonly}
      />
      <Input
        value={data?.avatar}
        onChange={onChangeAvatar}
        placeholder={t('your_avatar')}
        className={cls.input}
        readonly={readonly}
      />
      <CurrencySelect className={cls.input} value={data?.currency} onChange={onChangeCurrency} readonly={readonly} />
      <CountrySelect className={cls.input} value={data?.country} onChange={onChangeCountry} readonly={readonly} />

    </VStack>
  );
});
