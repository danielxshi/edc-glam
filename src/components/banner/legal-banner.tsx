import React from 'react';

interface LegalBannerProps {
  title: string;
}

const LegalBanner: React.FC<LegalBannerProps> = ({ title }) => {
  return (
    <section className="py-12 flex">
      <h1 className="text-3xl mb-6 mx-auto">{title}</h1>
    </section>
  );
};

export default LegalBanner;