var zipkinHost = "localhost"
var zipkinPort = 9411

if (process.env.ZIPKIN_SERVICE_HOST && process.env.ZIPKIN_SERVICE_PORT) {
  console.log("Routing Zipkin traffic to the Zipkin Kubernetes service")
  zipkinHost = process.env.ZIPKIN_SERVICE_HOST
  zipkinPort = process.env.ZIPKIN_SERVICE_PORT
} else {
  console.log("Detected we're running the Zipkin server locally")
}

var appzip = require('appmetrics-zipkin')({
  host: zipkinHost,
  port: zipkinPort,
  serviceName:'my-kube-frontend',
  sampleRate: 1.0
});

const appName = "appmetrics";
const express = require('express');
const log4js = require('log4js');

const logger = log4js.getLogger(appName);
const app = express();

const port = 9002

app.listen(port, function(){
  logger.info(`getter listening on http://localhost:${port}/appmetrics-dash`);
  logger.info(`getter listening on http://localhost:${port}`);
});

// Here's where we decide what the endpoints should actually do
app.get('/x', (req, res) => {

var lengthOfString = 10




  let myString = ''

  for (let i = 0; i < lengthOfString; i++){
    myString += String.fromCharCode(65+i%26)
  }

  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write("request to return " + lengthOfString + " chars received - result is " + myString.toLowerCase())
  res.end();




});
