const express = require('express');
const CLSContext = require('zipkin-context-cls');
const {Tracer, ExplicitContext, ConsoleRecorder, CountingSampler} = require('zipkin');
const {recorder} = require('./recorder');
const proxy = require('express-http-proxy');
//var request = require("request");
var bodyParser = require('body-parser');
const localServiceName = 'front-end-express';
var log4js = require('log4js');
log4js.configure({
  appenders: {
    logstash: {
      type: '@log4js-node/logstashudp',
      host: 'localhost',
      port: 4561,
      extraDataProvider: loggingEvent => ({
              clientIp: '1.2.3.4',
              pid: loggingEvent.pid,
              class: 'frontend.js',
              fields: {
                tag: 'dtux'
              }
            })
    }
  },
  categories: {
    default: { appenders: ['logstash'], level: 'info' }
  }
});

// {
//                        "date": "%d{yyy-MM-dd HH:mm:ss.SSS}",
//                        "severity": "%level",
//                        "service": "${springAppName:-}",
//                        "TraceId": "%X{X-B3-TraceId:-}",
//                        "SpanId": "%X{X-B3-SpanId:-}",
//                        "ParentSpanId": "%X{X-B3-ParentSpanId:-}",
//                        "exportable": "%X{X-Span-Export:-}",
//                        "pid": "${PID:-}",
//                        "thread": "%thread",
//                        "class": "%logger{40}",
//                        "method": "%M",
//                        "message": "%message",
//                        "zipkin": "true",
//                        "log": "%message",
//                        "hostname": "${serverName:-${HOSTNAME}}"
//                        }

const logger = log4js.getLogger();


//var logger = log4js.getLogger("CONSUMER");

const ctxImpl = new CLSContext('zipkin');



const tracer = new Tracer({ctxImpl, recorder, localServiceName});

const app = express();

// instrument the server
const zipkinMiddleware = require('zipkin-instrumentation-express').expressMiddleware;
app.use(zipkinMiddleware({tracer}));


//const wrapRequest = require('zipkin-instrumentation-request');
const ZipkinRequest = require('zipkin-instrumentation-request-promise').default;

const remoteServiceName = 'backend-express';
//const zipkinRequest = wrapRequest(request, {tracer, remoteServiceName});
const request = new ZipkinRequest(tracer);

const consoleRecorder = new ConsoleRecorder();
const consoleTracer =  new Tracer({
                        ctxImpl: ctxImpl,
                        recorder: consoleRecorder,
                        localServiceName: 'front-end-console' // name of this application
                      });


function loggerTrace(msg) {
  consoleTracer.local('front-end-trace', () => {


        console.log(msg);
      return msg;
    });
}
app.get('/frontend', (req, res) => {


request.get('http://localhost:9000/api')
  .then(function(body, response) {

    logger.info(`${body}`, { method: 'get', class: 'frontend.js', zipkin: 'true' });
    console.log('body:', body);
        loggerTrace(`${body}`);
        res.send(`${body}`);
  })
  .catch(function(err){
    console.log('error:', error);
  });


});


app.listen(9001, () => {
  console.log('Frontend listening on port 9001!');
});