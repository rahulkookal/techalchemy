const express = require('express');
const router = express.Router();

const getEverything = require('../lib/news-api');

/* GET news */
router.get('/', async function(req, res, next) {  
  getEverything(req.query).then(
    (result) => res.send({ data: result.articles, count: result.totalResults }), 
    (err) => res.status(503).send(err))
  });

module.exports = router;
