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
module.exports = {getDate, getIndex, getConstituent};




