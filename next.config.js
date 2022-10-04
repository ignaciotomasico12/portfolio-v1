const { i18n } = require('./next-i18next.config');
const path = require('path')

module.exports = {
  i18n,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
      config.resolve.fallback.velocityjs = false;
      config.resolve.fallback.atpl = false;
      config.resolve.fallback.liquor = false;
      config.resolve.fallback.dustjs_linkedin = false;
      config.resolve.fallback.twig = false;
      config.resolve.fallback.ejs = false;
      config.resolve.fallback.eco = false;
      config.resolve.fallback.jazz = false;
    }
    return config;
  },
};