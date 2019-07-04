import { Constants } from 'expo';

const ENV = {
  dev: {
    ROOT_URL: 'http://localhost:8080/api',
    ENV: 'dev',
  },
  prod: {
    ROOT_URL: 'TBD',
    ENV: 'prod',
  },
};

/**
 * Get environment release channel
 *
 * @param {string} env
 * @return {object}
 */
const getEnv = (env = '') => {
  if (env.includes('prod')) {
    return ENV.prod;
  }
  if (env.includes('staging')) {
    return ENV.staging;
  }
  return ENV.dev;
};

export default getEnv(Constants.manifest.releaseChannel);
