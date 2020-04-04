const express = require('express');
const userRoutes = require('./user.route');
const eventRoutes = require('./event.route');
const authRoutes = require('./auth.route');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/docs
 */
router.use('/docs', express.static('docs'));
router.use('/user', userRoutes);
// router.use("/event", eventRoutes);
router.use('/auth', authRoutes);

module.exports = router;

// Access key ID   AKIAU55ZNRY73EZ6HI6A
// Secret access key  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
