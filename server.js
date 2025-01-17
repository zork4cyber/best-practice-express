'use strict';

const express = require("express");
const app = express();

const notFoundHandler = require("./handlers/404");
const errorHandler = require("./handlers/500");
const timeStamper = require("./middleware/time-stamper");

app.get('/', timeStamper, (req, res) => {
    res.status(200).send("Hello World")
});

app.get('/data', timeStamper, (req, res) => {
    let outputObject = {
        10: "even",
        5: "odd",
        "time": req.timestamp // we got this from the middleware
      }

      res.status(200).send(outputObject);
});

app.get('/bad', (req, res) => {
    next("you messed up");
});

app.get("*", notFoundHandler);
app.use(errorHandler);

function start(port){
    app.listen(port, () => console.log(`server up on port ${port}`));
}

module.exports ={
    app: app,
    start: start
}