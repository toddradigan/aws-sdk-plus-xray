'use strict';

const AWSXRay = require('aws-xray-sdk');
const AWS = process.env.NODE_ENV === 'test'
  ? require('aws-sdk')
  : AWSXRay.captureAWS(require('aws-sdk'));

module.exports = AWS;
