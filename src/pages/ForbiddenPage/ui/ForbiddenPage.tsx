import React from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';

const ForbiddenPage = () => {
  const { t } = useTranslation();

  return (
    <Page data-testid="forbiddenPage">
      {t("don't_have_rights")}
    </Page>
  );
};

export default ForbiddenPage;
