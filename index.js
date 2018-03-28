'use strict';

const AWS = require('aws-sdk');
const AWSXRay = require('aws-xray-sdk');
const http = require('http');
const https = require('https');

function withOptions(options = {}) {
  // defaults to enabled
  const disabled = process.env.XRAY_DISABLED
    && process.env.XRAY_DISABLED.toLowerCase() === 'true';

  const testEnv = process.env.NODE_ENV
    && process.env.NODE_ENV.toLowerCase() === 'test';

  if (disabled || testEnv) {
    return AWS;
  }

  if (options.logger) {
    AWSXRay.setLogger(options.logger);
  }

  if (options.rules) {
    AWSXRay.middleware.setSamplingRules(options.rules);
  }

  if (options.daemonAddress) {
    AWSXRay.setDaemonAddress(options.daemonAddress);
  }

  AWSXRay.captureHTTPsGlobal(http);
  AWSXRay.captureHTTPsGlobal(https);

  return AWSXRay.captureAWS(AWS);
}

module.exports = withOptions();

module.exports.withOptions = withOptions;
