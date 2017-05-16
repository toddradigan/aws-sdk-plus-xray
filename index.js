'use strict';

const AWSXRay = require('aws-xray-sdk');

const disabled = process.env.XRAY_DISABLED === undefined
  ? (process.env.NODE_ENV === 'test')
  : process.env.XRAY_DISABLED;

const AWS = disabled
  ? require('aws-sdk')
  : AWSXRay.captureAWS(require('aws-sdk'));

module.exports = AWS;
