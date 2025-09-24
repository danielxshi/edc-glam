import React from 'react';

// /Users/danielshi/Github/edcglam/src/components/layout/MainLayout.tsx

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <main className="mx-auto max-w-4xl px-6 pb-16 pt-36">
      {children}
    </main>
  );
};

export default MainLayout;
