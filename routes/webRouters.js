const express = require('express');
const router = express.Router();
const dataset = require('../readCSV');

/* GET home page. */
router.get('/', async function (req, res, next) {
    dataset.getDate().then(date => {
        dataset.getIndex().then(index => {
            res.render('index', {date: date, index: index});
        });
    });
});

router.get('/data', async function (req, res, next) {
    dataset.getDate().then(date => {
        dataset.getIndex().then(index => {
            res.send({date: date, index: index});
        });
    });

});

module.exports = router;
