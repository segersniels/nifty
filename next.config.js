module.exports = {
  swcMinify: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'openseauserdata.com', 'i.seadn.io'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    runtime: 'experimental-edge',
    images: {
      allowFutureImage: true,
    },
  },
};
