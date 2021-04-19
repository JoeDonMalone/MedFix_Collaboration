const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
// const calenderRoutes = require('./calendar-routes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
// router.use('/calendar', calenderRoutes);

module.exports = router;
