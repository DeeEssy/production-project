import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from 'widgets/Page/Page';

const MainPage = memo(() => {
  const { t } = useTranslation('mainPage');

  return (
    <Page>
      {t('main')}
    </Page>
  );
});

export default MainPage;
