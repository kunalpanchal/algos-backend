
const redisClient = require('../../config/redis')();
const { promisify } = require('util');
const hgetall = promisify(redisClient.hgetall).bind(redisClient);

/* Main algorithm 
    n = total number of words in the file test.txt;
    m = total number of unique words in the file test.txt
    COMPLEXITY => O( n + m + mlog(m) ) => O( n + mlog(m) )
*/

const topCount = (data, k) => {
    let dataArr = sanitizeData(data).split(' ');
    let hashObj = {};

    // This loop runs as many times as number of words in the file text.txt  | COMPLEXITY => O(n)   
    dataArr.forEach(ele => hashObj[ele] = hashObj[ele] ? hashObj[ele] + 1 : 1);
    redisClient && redisClient.hmset("frequent_words", hashObj);

    return sortAsArray(hashObj, k, dataArr);
}

const sortAsArray = (hashObj, k, dataArr) => {
    let hashArr = [];
    // This loop runs as many times as number of unique words in the file text.txt | COMPLEXITY => O(m)       
    for (let obj in hashObj) hashArr.push([obj, hashObj[obj]]);

    // COMPLEXITY => O( mlog(m) )        
    hashArr.sort((a, b) => b[1] - a[1]);
    return {
        totalWords: dataArr ? dataArr.length : undefined,
        totalUniqueWords: hashArr.length,
        topOccurence: hashArr.slice(0, k)
    };
}

const sanitizeData = data => {
    //replace all the newline,tabs and return carriages
    data = data.replace(/(?:\r\n|\r|\n|\t)/g, ' ');
    //replace special characters with space
    data = data.replace(/\.|\/|\@|\?|\(|\)|–|,|"|:|>|</g, ' ');
    //replace numbers with space    
    data = data.replace(/[0-9]/g, ' ')
    //replace multiple spaces with a single space
    data = data.replace(/  +/g, ' ');
    //Trim the data 
    data = data.trim();
    return data;
}


const redisData = async k => {
    let hashObj = await hgetall("frequent_words");
    return sortAsArray(hashObj, k);
}

module.exports.redisData = redisData;
module.exports.topCount = topCount;