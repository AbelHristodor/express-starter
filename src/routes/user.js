const router = require('express').Router();
const controller = require('../controllers/user');

router.route('/').get(controller.getUsers);

module.exports = router;
