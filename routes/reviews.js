const {
  index,
  show,
  create,
  update,
  delete: _delete,
} = require('../controllers/ReviewsController');

module.exports = (router) => {
  router.get('/reviews', index);
  router.get('/reviews/:id', show);
  router.post('/reviews', create);
  router.post('/reviews/update', update);
  router.post('/reviews/delete', _delete);
};
