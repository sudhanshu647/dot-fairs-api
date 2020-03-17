const express = require('express');
const userRoutes = require('./user.route');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/docs
 */
router.use('/user', userRoutes);

module.exports = router;
