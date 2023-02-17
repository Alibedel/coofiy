var express = require('express');
var router = express.Router();
const recipesCtrl = require('../controllers/recipes');
const helpers = require('../config/helpers');

router.get('/', recipesCtrl.index)
router.get('/:id', recipesCtrl.show)
router.post('/create', recipesCtrl.create)
router.put('/:id', recipesCtrl.update)
router.delete('/:id', recipesCtrl.delete)







module.exports = router;
