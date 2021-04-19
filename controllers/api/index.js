const router = require('express').Router();
const userRoutes = require('./user-routes');
const medicationRoutes = require('./medication-routes')

router.use('/medication', medicationRoutes)
router.use('/users', userRoutes);

module.exports = router;
