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
router.get('/constituent', async (req, res, next) => {
    try {
        const constituent = await dataset.getConstituent();
        const select_date = constituent.filter(result => {
            return result[0] === `2012/12/19`;
        });
        res.render('constituent', {result: select_date, range: `2012/12/19~2013/06/19`});
    } catch (e) {
        console.log(e);
    }
});

/* POST constituent page. */
router.post('/constituent', async (req, res, next) => {
    try {
        const constituent = await dataset.getConstituent();
        const select_date = constituent.filter(result => {
            return `${req.body.date}`.substring(0, 10) === result[0];
        });
        res.render('constituent', {result: select_date, range: req.body.range});
    } catch (e) {
        console.log(e);
    }
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
router.get('/indexData', async (req, res, next) => {
    try {
        const [date, index] = await Promise.all([dataset.getDate(), dataset.getIndex()]);
        res.send({date, index});
    } catch (e) {
        console.log(e);
    }
});

/* GET index performance graph data */
router.get('/indexPerformanceData', async (req, res, next) => {
    try {
        const [date, index, tm100, tf001] = await Promise.all([dataset.getDate(), dataset.getIndex(), dataset.getTM100Performance(), dataset.getTF001Performance()]);
        res.send({date, index: [index, tm100, tf001]});
    } catch (e) {
        console.log(e);
    }
});

/* GET performance graph data */
router.get('/performanceData', async (req, res, next) => {
    try {
        const performance = await dataset.getPerformance();
        res.send({performance});
    } catch (e) {
        console.log(e);
    }
});

/* GET performance 1y graph data */
router.get('/performanceData_1y', async (req, res, next) => {
    try {
        const performance = await dataset.getPerformance1y();
        res.send({performance});
    } catch (e) {
        console.log(e);
    }
});


/* GET performance graph data */
router.get('/performanceData_3y', async (req, res, next) => {
    try {
        const performance = await dataset.getPerformance3y();
        res.send({performance});
    } catch (e) {
        console.log(e);
    }
});

/* GET implementation cumulative compensation graph data */
router.get('/cumulativeCompensation', async (req, res, next) => {
    try {
        const [date, cumulativeCompensation] = await Promise.all([dataset.getDate(), dataset.getImplementation()]);
        res.send({date, cumulativeCompensation});
    } catch (e) {
        console.log(e);
    }
});

/* GET implementation performance compare graph data */
router.get('/implementation_performance', async (req, res, next) => {
    try {
        const performance = await dataset.getImplementationPerformance();
        res.send({performance});
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;
