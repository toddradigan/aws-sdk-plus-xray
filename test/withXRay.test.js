'use strict';

describe('exports aws-sdk wrapped with the aws-xray-sdk', () => {
  describe('when XRAY_DISABLED is false', () => {
    const oldEnv = {};
    beforeAll(() => {
      oldEnv.XRAY_DISABLED = process.env.XRAY_DISABLED;
      oldEnv.NODE_ENV = process.env.NODE_ENV;
      process.env.XRAY_DISABLED = false;
      process.env.NODE_ENV = 'test';
    });

    afterAll(() => {
      process.env.XRAY_DISABLED = oldEnv.XRAY_DISABLED;
      process.env.NODE_ENV = oldEnv.NODE_ENV;
    });

    test('with no config options', () => {
      const AWS = require('../')(); // eslint-disable-line global-require
      expect(new AWS.S3()).toBeDefined();
    });

    test('with logger config option', () => {
      const AWS = require('../')({ logger: console }); // eslint-disable-line global-require
      expect(new AWS.S3()).toBeDefined();
    });

    test('with sampling rules config option', () => {
      const AWS = require('../')({ rules: {} }); // eslint-disable-line global-require
      expect(new AWS.S3()).toBeDefined();
    });

    test('with daemon address config option', () => {
      const AWS = require('../')({ daemonAddress: '127.0.0.1:2000' }); // eslint-disable-line global-require
      expect(new AWS.S3()).toBeDefined();
    });
  });

  describe('when XRAY_DISABLED is undefined and NODE_ENV is not "test"', () => {
    const oldEnv = {};
    beforeAll(() => {
      oldEnv.XRAY_DISABLED = process.env.XRAY_DISABLED;
      oldEnv.NODE_ENV = process.env.NODE_ENV;
      delete process.env.XRAY_DISABLED;
      process.env.NODE_ENV = 'dev';
    });

    afterAll(() => {
      process.env.XRAY_DISABLED = oldEnv.XRAY_DISABLED;
      process.env.NODE_ENV = oldEnv.NODE_ENV;
    });

    test('with no config options', () => {
      const AWS = require('../')(); // eslint-disable-line global-require
      expect(new AWS.S3()).toBeDefined();
    });

    test('with logger config option', () => {
      const AWS = require('../')({ logger: console }); // eslint-disable-line global-require
      expect(new AWS.S3()).toBeDefined();
    });

    test('with sampling rules config option', () => {
      const AWS = require('../')({ // eslint-disable-line global-require
        rules: {
          default: { fixed_target: 1, rate: 0.1 },
          version: 1,
        },
      });
      expect(new AWS.S3()).toBeDefined();
    });

    test('with daemon address config option', () => {
      const AWS = require('../')({ daemonAddress: '127.0.0.1:2000' }); // eslint-disable-line global-require
      expect(new AWS.S3()).toBeDefined();
    });
  });
});
