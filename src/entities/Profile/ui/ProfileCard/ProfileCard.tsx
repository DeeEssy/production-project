import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Currency, CurrencySelect } from '@/entities/Currency';
import { Country, CountrySelect } from '@/entities/Country';
import { Input } from '@/shared/ui/Input';
import { Text } from '@/shared/ui/Text';
import { Avatar } from '@/shared/ui/Avatar';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Card } from '@/shared/ui/Card';
import { Skeleton } from '@/shared/ui/Skeleton';

import { Profile } from '../../model/types/profile';

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
      <Card padding="24" max>
        <VStack gap="32">
          <HStack max justify="center">
            <Skeleton border="100%" width={128} height={128} />
          </HStack>
          <HStack gap="32" max>
            <VStack gap="16" max>
              <Skeleton width="100%" height={38} />
              <Skeleton width="100%" height={38} />
              <Skeleton width="100%" height={38} />
              <Skeleton width="100%" height={38} />
            </VStack>

            <VStack gap="16" max>
              <Skeleton width="100%" height={38} />
              <Skeleton width="100%" height={38} />
              <Skeleton width="100%" height={38} />
              <Skeleton width="100%" height={38} />
            </VStack>
          </HStack>
        </VStack>
      </Card>
    );
  }

  if (error) {
    return (
      <HStack justify="center" max>
        <Text
          variant="error"
          title={t('error_downloading_profile')}
          text={t('error_try_reload_page')}
          align="center"
        />
      </HStack>
    );
  }

  return (
    <Card padding="24" max className={className}>
      <VStack gap="32">
        {data?.avatar && (
        <HStack justify="center" max>
          <Avatar size={128} src={data?.avatar} />
        </HStack>
        )}
        <HStack gap="24" max>
          <VStack gap="16" max>
            <Input
              value={data?.firstname}
              onChange={onChangeFirstname}
              label={t('your_firstname')}
              readonly={readonly}
              data-testid="profile-card-firstname"
            />
            <Input
              value={data?.lastname}
              onChange={onChangeLastname}
              label={t('your_lastname')}
              readonly={readonly}
              data-testid="profile-card-lastname"
            />
            <Input
              type="number"
              value={data?.age}
              onChange={onChangeAge}
              label={t('your_age')}
              readonly={readonly}
            />
            <Input
              value={data?.city}
              onChange={onChangeCity}
              label={t('your_city')}
              readonly={readonly}
            />
          </VStack>
          <VStack gap="16" max>
            <Input
              value={data?.username}
              onChange={onChangeUsername}
              label={t('your_username')}
              readonly={readonly}
            />
            <Input
              value={data?.avatar}
              onChange={onChangeAvatar}
              label={t('your_avatar')}
              readonly={readonly}
            />
            <CurrencySelect value={data?.currency} onChange={onChangeCurrency} readonly={readonly} />
            <CountrySelect value={data?.country} onChange={onChangeCountry} readonly={readonly} />
          </VStack>
        </HStack>
      </VStack>
    </Card>
  );
});
