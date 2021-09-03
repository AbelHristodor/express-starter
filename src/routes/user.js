const router = require('express').Router();
const controller = require('../controllers/user');

router
    .get('/all', controller.getAll)
    .get('/:id', controller.getOne)
    .post('/', controller.create)
    .put('/:id', controller.update)
    .delete('/:id', controller.terminate);

module.exports = router;
