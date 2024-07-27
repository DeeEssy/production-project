import { memo } from 'react';

import { ArticleDetails } from '@/entities/Article';
import { Card } from '@/shared/ui/Card';

interface DetailsContainterProps {
    className?: string;
    id: number;
}

export const DetailsContainer = memo((props: DetailsContainterProps) => {
  const { className, id } = props;

  return (
    <Card max border="sm-round" className={className} padding="24">
      <ArticleDetails id={id} />
    </Card>
  );
});
