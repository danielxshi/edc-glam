const path = require('path');

const nextConfig = {
  images: {
    domains: ['cdn.shopify.com', 'via.placeholder.com', 'images.pexels.com'],
  },
  webpack(config) {
    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  },
};

module.exports = nextConfig;