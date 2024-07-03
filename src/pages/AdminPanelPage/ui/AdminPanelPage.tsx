import { useTranslation } from 'react-i18next';

import { Page } from 'widgets/Page';

const AdminPanelPage = () => {
  const { t } = useTranslation('adminPanelPage');

  return (
    <Page>
      {t('admin_panel')}
    </Page>
  );
};

export default AdminPanelPage;
