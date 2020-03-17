// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign
const { port, env } = require('./config/vars');
const logger = require('./config/logger');
const app = require('./config/express');
// const mongoose = require('./config/mongoose');
// const db = require('./api/models');

// open mongoose connection
// mongoose.connect();
// this will listen to and show all activities on our terminal to
// let us know what is happening in our app
// Syncing our database and logging a message to the user upon success
// db.sequelize.sync().then(() => {
//   app.listen(port, () => logger.info(`server started on port ${port} (${env})`));
// });

// listen to requests
app.listen(port, () => logger.info(`server started on port ${port} (${env})`));

/**
 * Exports express
 * @public
 */
module.exports = app;