"use strict"

const http = require("http");
const topCountAlgo = require("../algorithms").topCount;
const getDataFromRedis = require("../algorithms").redisData;
module.exports = {
    getFrequentWords: async (req, res, next) => {
        const input = req.query.input;
        const useRedis = req.query.useRedis;
        if (!input) return res.json({ error: 'No input sent' });
        if (!isValidInt(input) || input < 0) return res.json({ error: 'The input recieved is not a valid possitive integer number' });
        let textTxt = '';
        if (!useRedis) {
            let request = http.get('http://terriblytinytales.com/test.txt', function (response) {
                response.setEncoding('utf8');
                response.on('data', chunk => textTxt += chunk);
                response.on('end', () => res.json({ output: topCountAlgo(textTxt, input) }));
            });
            request.on('error', error => res.json({ error }));
            request.end();
        } else {
            await res.json({ output: await getDataFromRedis(input) });
        }
    }
}

const isValidInt = (value) => {
    return !isNaN(value) && (function (x) { return (x | 0) === x; })(parseFloat(value))
}
