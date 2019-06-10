const express = require('express');
const router = express.Router();
const dataset = require('../readCSV');

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index');
});

/* GET process page. */
router.get('/process', (req, res, next) => {
    res.render('process');
});

/* GET customer page. */
router.get('/customer', (req, res, next) => {
    res.render('customer');
});

/* GET constituent page. */
router.get('/constituent', (req, res, next) => {
    dataset.getConstituent().then(result => {
        res.render('constituent', {result:result});
    });
});

/* GET graph data */
router.get('/data', (req, res, next) => {
    dataset.getDate().then(date => {
        dataset.getIndex().then(index => {
            res.send({date: date, index: index});
        });
    });
});

module.exports = router;
