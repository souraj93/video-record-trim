import { Loader2 } from 'lucide-react';
import React from 'react';

const PageLoader = () => {
  return (
    <>
      {' '}
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-main" />
      </div>
    </>
  );
};

export default PageLoader;
