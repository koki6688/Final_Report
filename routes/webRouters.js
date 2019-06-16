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
    dataset.getConstituent().then(results => {
        let select_date = results.filter(result => {
            return result[0] === `2012/12/19`;
        });
        res.render('constituent', {result: select_date, range: `2012/12/19~2013/06/19`});
    });
});

/* POST constituent page. */
router.post('/constituent', (req, res, next) => {
    dataset.getConstituent().then(results => {
        let select_date = results.filter(result => {
            return `${req.body.date}`.substring(0,10) === result[0];
        });
        res.render('constituent', {result: select_date, range: req.body.range});
    });
});

/* GET performance page. */
router.get('/performance', (req, res, next) => {
    res.render('performance');
});

/* GET index graph data */
router.get('/indexData', (req, res, next) => {
    dataset.getDate().then(date => {
        dataset.getIndex().then(index => {
            res.send({date: date, index: index});
        });
    });
});

/* GET performance graph data */
router.get('/performanceData', (req, res, next) => {
    res.send({index: "a"});
});

module.exports = router;
