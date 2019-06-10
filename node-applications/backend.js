const express = require('express');
const CLSContext = require('zipkin-context-cls');
const {Tracer, ExplicitContext, ConsoleRecorder, CountingSampler} = require('zipkin');
const {recorder} = require('./recorder');
const proxy = require('express-http-proxy');
//var request = require("request");
var bodyParser = require('body-parser');

var log4js = require('log4js');
var logger = log4js.getLogger("CONSUMER");

const ctxImpl = new CLSContext('zipkin');
const localServiceName = 'backend-express';


const tracer = new Tracer({ctxImpl, recorder, localServiceName});

const app = express();

// instrument the server
const zipkinMiddleware = require('zipkin-instrumentation-express').expressMiddleware;
app.use(zipkinMiddleware({tracer}));


//const wrapRequest = require('zipkin-instrumentation-request');
const ZipkinRequest = require('zipkin-instrumentation-request-promise').default;

const remoteServiceName = 'http-service';
//const zipkinRequest = wrapRequest(request, {tracer, remoteServiceName});
const request = new ZipkinRequest(tracer);

const consoleRecorder = new ConsoleRecorder();
const consoleTracer =  new Tracer({
                        ctxImpl: ctxImpl,
                        recorder: consoleRecorder,
                        localServiceName: 'backend-console' // name of this application
                      });


function loggerTrace(msg) {
  consoleTracer.local('backend-trace', () => {
        console.log(msg);
      return msg;
    });
}
app.get('/api', (req, res) => {


request.get('http://localhost:8080/trips')
  .then(function(body, response) {

    console.log('body:', body);
        loggerTrace(`${body}`);
        res.send(`${body}`);
  })
  .catch(function(err){
    console.log('error:', error);
  });


});



//app.get('/api', bodyParser.text({type: '*/*'}), (req, res) => {
//
//    let msg = Request.get("http://localhost:8080/trips", (error, response, body) => {
//      logger.info("CONSUMER ==> " + body);
//      logger.debug("CONSUMER ==> " + body);
//
//      res.status(200).send({
//              success: 'true',
//              message: body,
//          })
//
//    });
//
//
//
//});

app.listen(9000, () => {
  console.log('Backend listening on port 9000!');
});