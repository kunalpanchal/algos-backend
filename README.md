# algos-backend
API for https://github.com/kunalpanchal/algos-frontend based on Node.JS

## Algo (Frequent Words Count)

### Run locally and test
    cd algos-backend && npm i && npm start

For testing run :

    npm run test

![alt screenshot-1](https://raw.githubusercontent.com/kunalpanchal/algos-backend/master/extras/screenshots/scr-test-results.png)

### Routes 
    GET /get-frequent-words?input=99
    GET /get-frequent-words?input=99&useRedis=true
    
### Pseudo Code    
### Dependencies Used
    "body-parser": "~1.17.1",
    "cookie-parser": "~1.4.3",
    "cors": "^2.8.4",
    "dotenv": "^4.0.0",
    "express": "~4.15.2",
    "express-promise-router": "^2.0.0",
    "redis": "^2.8.0"
    
    // Dev Dependencies
    "chai": "^4.1.2",
    "chai-http": "^3.0.0",
    "mocha": "^4.0.1"
