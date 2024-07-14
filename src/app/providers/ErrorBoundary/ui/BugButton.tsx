import { useEffect, useState } from 'react';
import { Button } from '@/shared/ui/Button';

// Component only for testing
export const BugButton = () => {
  const [error, setError] = useState(false);

  const toggleError = () => setError((prev) => !prev);

  useEffect(() => {
    if (!error) return;

    throw new Error();
  }, [error]);

  return (
    <div>
      {/* eslint-disable-next-line i18next/no-literal-string */}
      <Button onClick={toggleError}>create error</Button>
    </div>
  );
};
