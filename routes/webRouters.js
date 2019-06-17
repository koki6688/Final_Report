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
            return `${req.body.date}`.substring(0, 10) === result[0];
        });
        res.render('constituent', {result: select_date, range: req.body.range});
    });
});

/* GET performance page. */
router.get('/performance', (req, res, next) => {
    res.render('performance', {range: "整體績效"});
});

/* POST performance page. */
router.post('/performance', (req, res, next) => {
    switch (req.body.range) {
        case "performance-1y":
            res.render('performance', {range: "一年期績效"});
            break;
        case "performance-3y":
            res.render('performance', {range: "三年期績效"});
            break;
        default:
            res.render('performance', {range: "整體績效"});
            break;
    }
});

/* GET implementation page. */
router.get('/implementation', (req, res, next) => {
    res.render('implementation');
});


/* GET index graph data */
router.get('/indexData', (req, res, next) => {
    Promise.all([dataset.getDate(), dataset.getIndex()]).then(value => {
        res.send({date: value[0], index: value[1]});
    });
});

/* GET index performance graph data */
router.get('/indexPerformanceData', (req, res, next) => {
    Promise.all([dataset.getDate(), dataset.getIndex(), dataset.getTM100Performance(), dataset.getTF001Performance()]).then(value => {
        res.send({date: value[0], index: [value[1], value[2], value[3]]});
    });
});

/* GET performance graph data */
router.get('/performanceData', (req, res, next) => {
    dataset.getPerformance().then(performance => {
        res.send({performance: performance});
    });
});

/* GET performance 1y graph data */
router.get('/performanceData_1y', (req, res, next) => {
    dataset.getPerformance1y().then(performance => {
        res.send({performance: performance});
    });
});


/* GET performance graph data */
router.get('/performanceData_3y', (req, res, next) => {
    dataset.getPerformance3y().then(performance => {
        res.send({performance: performance});
    });
});

module.exports = router;
