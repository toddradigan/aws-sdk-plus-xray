'use strict';

const AWS = require('aws-sdk');
const AWSXRay = require('aws-xray-sdk');

function withOptions(options = {}) {
  const disabled = process.env.XRAY_DISABLED === undefined
    ? (process.env.NODE_ENV === 'test')
    : process.env.XRAY_DISABLED;

  if (disabled) {
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

  return AWSXRay.captureAWS(AWS);
}

module.exports = withOptions();

module.exports.withOptions = withOptions;
