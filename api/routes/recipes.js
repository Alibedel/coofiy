const express = require('express');
const router = express.Router();
const recipesCtrl = require('../controllers/recipes');
const { checkAuth } = require('../config/helpers');

// All recipe routes require a logged-in user
router.use(checkAuth);

router.get('/', recipesCtrl.index);
router.post('/create', recipesCtrl.create);
router.get('/:id', recipesCtrl.show);
router.put('/:id', recipesCtrl.update);
router.delete('/:id', recipesCtrl.delete);

module.exports = router;
