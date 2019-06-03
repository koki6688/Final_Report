const csv = require("fast-csv");

const getDate = () => {
    return new Promise(resolve => {
        const result = [];
        csv.fromPath("./Datasets/SmartBeta.csv")
            .on("data", results => {
                result.push(results[2]);
            })
            .on("end", () => {
                resolve(result);
            });
    });

};

const getIndex = () => {
    return new Promise(resolve => {
        const result = [];
        csv.fromPath("./Datasets/SmartBeta.csv")
            .on("data", results => {
                result.push(results[3]);
            })
            .on("end", () => {
                resolve(result);
            });
    });

};

module.exports = {getDate, getIndex};




