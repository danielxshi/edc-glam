import React from 'react';

interface ShortBannerProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
}

const ShortBanner: React.FC<ShortBannerProps> = ({ title, subtitle, backgroundImage }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '300px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      ></div>
      <div style={{ zIndex: 1 }}>
        <h1 style={{ fontSize: '2rem', margin: 0 }}>{title}</h1>
        {subtitle && <p style={{ fontSize: '1.2rem', marginTop: '0.5rem' }}>{subtitle}</p>}
      </div>
    </div>
  );
};

export default ShortBanner;