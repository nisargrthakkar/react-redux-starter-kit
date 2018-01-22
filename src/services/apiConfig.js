
const env = process.env.NODE_ENV || 'development';

const apiEnvironment = {
  development: {
    api: 'https://jsonplaceholder.typicode.com'
  },
  production: {
    api: 'https://jsonplaceholder.typicode.com'
  }
};

module.exports = apiEnvironment[env];
