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

const getConstituent = () => {
    return new Promise(resolve => {
        const result = [];

        csv.fromPath("./Datasets/Constituent_stock_weight.csv")
            .on("data", results => {
                let date = `${(results[0]).substring(0, 4)}/${(results[0]).substring(4, 6)}/${(results[0]).substring(6, 8)}`;
                let code = parseInt(results[1]);
                let company = results[2];
                let ratio = `${(results[3] * 100 + "").substring(0, 4)}%`;
                result.push([date, code, company, ratio]);
            })
            .on("end", () => {
                resolve(result);
            });
    });
};

const getTF001Performance = () => {
    return new Promise(resolve => {
        const result = [];
        csv.fromPath("./Datasets/TF001.csv")
            .on("data", results => {
                result.push(results[3]);
            })
            .on("end", () => {
                resolve(result);
            });
    });
};

const getTM100Performance = () => {
    return new Promise(resolve => {
        const result = [];
        csv.fromPath("./Datasets/TM100.csv")
            .on("data", results => {
                result.push(results[3]);
            })
            .on("end", () => {
                resolve(result);
            });
    });
};

const getPerformance = () => {
    return new Promise(resolve => {
        const result = [];

        csv.fromPath("./Datasets/performance.csv")
            .on("data", results => {
                let index = results[0];
                let annualizedReturn = results[2];
                let annualizedSTD = results[3];
                let sharpeRatio = results[4];
                let treynorRatio = results[5];
                result.push([index, annualizedReturn, annualizedSTD, sharpeRatio, treynorRatio]);
            })
            .on("end", () => {
                resolve(result);
            });
    });
};

const getPerformance1y = () => {
    return new Promise(resolve => {
        const result = [];

        csv.fromPath("./Datasets/performance_1y.csv")
            .on("data", results => {
                let index = results[0];
                let annualizedReturn = results[2];
                let annualizedSTD = results[3];
                let sharpeRatio = results[4];
                let treynorRatio = results[5];
                result.push([index, annualizedReturn, annualizedSTD, sharpeRatio, treynorRatio]);
            })
            .on("end", () => {
                resolve(result);
            });
    });
};

const getPerformance3y = () => {
    return new Promise(resolve => {
        const result = [];

        csv.fromPath("./Datasets/performance_3y.csv")
            .on("data", results => {
                let index = results[0];
                let annualizedReturn = results[2];
                let annualizedSTD = results[3];
                let sharpeRatio = results[4];
                let treynorRatio = results[5];
                result.push([index, annualizedReturn, annualizedSTD, sharpeRatio, treynorRatio]);
            })
            .on("end", () => {
                resolve(result);
            });
    });
};


module.exports = {
    getDate,
    getIndex,
    getConstituent,
    getPerformance,
    getPerformance1y,
    getPerformance3y,
    getTF001Performance,
    getTM100Performance
};




