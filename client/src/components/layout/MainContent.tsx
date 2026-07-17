import React from 'react';

const MainContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <main
      id="main-content"
      aria-labelledby="main-heading"
      className="relative z-0 flex min-h-0 min-w-0 flex-1 flex-col bg-background md:pl-4"
    >
      {children}
    </main>
  );
};

export default MainContent;
