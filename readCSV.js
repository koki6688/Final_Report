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
        const date = [];
        const code = [];
        const company = [];
        const ratio = [];
        csv.fromPath("./Datasets/Constituent_stock_weight.csv")
            .on("data", results => {
                date.push(`${(results[0]).substring(0,4)}/${(results[0]).substring(4,6)}/${(results[0]).substring(6,8)}`);
                code.push(parseInt(results[1]));
                company.push(results[2]);
                ratio.push(`${(results[3] * 100 + "").substring(0, 4)}%`);
            })
            .on("end", () => {
                result.push(date);
                result.push(code);
                result.push(company);
                result.push(ratio);
                resolve(result);
            });
    });
};
module.exports = {getDate, getIndex, getConstituent};




