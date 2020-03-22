const path = require('path');

// import .env variables
require('dotenv-safe').config({
  path: path.join(__dirname, '../../.env'),
  sample: path.join(__dirname, '../../.env.example'),
});

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  websiteUrl: process.env.WEBSITE_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES,
  apiUrl: process.env.API_URL,
  mysqlConfig: {
    dBUserName: process.env.MYSQL_DB_USERNAME,
    dbPassword: process.env.MYSQL_DB_PASSWORD,
    dbName: process.env.MYSQL_DB_NAME,
    dbHost: process.env.MYSQL_DB_HOST,
  },
  // mongo: {
  //   uri: process.env.NODE_ENV === 'test'
  //     ? process.env.MONGO_URI_TESTS
  //     : process.env.MONGO_URI,
  // },
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
};
