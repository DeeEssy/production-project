import { useTranslation } from 'react-i18next';

import { Page } from '@/widgets/Page';

const AboutPage = () => {
  const { t } = useTranslation('aboutPage');
  return <Page data-testid="aboutPage">{t('about')}</Page>;
};

export default AboutPage;
