var express = require('express');
var router = express.Router();
var content = require('../controllers/ContentsController.js');

router.get('/', content.list);

router.get('/show/:id', content.show);

router.get('/create', content.create);

router.post('/save', content.save);

router.get('/edit/:id', content.edit);

router.post('/update/:id', content.update);

router.post('/delete/:id', content.delete);

module.exports = router;