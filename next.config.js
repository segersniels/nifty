module.exports = {
  swcMinify: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'openseauserdata.com'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
};
