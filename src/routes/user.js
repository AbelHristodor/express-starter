const router = require('express').Router();
const controller = require('../controllers/user');

router.route('/all').get(controller.getAll);

router.route('/:id').get(controller.getOne);

router.route('/').post(controller.create);

router.route('/:id').put(controller.update);

router.route('/:id').delete(controller.terminate);

module.exports = router;
