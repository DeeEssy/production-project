import { memo } from 'react';
import { useParams } from 'react-router-dom';

import { Page } from '@/widgets/Page';
import { EditableProfileCard } from '@/features/EditableProfileCard';

const ProfilePage = memo(() => {
  const { id } = useParams<{id: string}>();

  return (
    <Page data-testid="profilePage">
      <EditableProfileCard id={Number(id)} />
    </Page>
  );
});

export default ProfilePage;
