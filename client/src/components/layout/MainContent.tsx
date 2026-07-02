import React from 'react';

const MainContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <main id="main-content" aria-labelledby="main-heading" className="min-w-0 flex-1 md:pl-4">
      {children}
    </main>
  );
};

export default MainContent;
