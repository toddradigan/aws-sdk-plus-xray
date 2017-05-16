const AWS = require('../');

describe('exports aws-sdk wrapped with the aws-xray-sdk', () => {
  it('when XRAY_DISABLED is false', () => {
    process.env.XRAY_DISABLED = false;
    process.env.NODE_ENV = 'test';

    expect(new AWS.S3()).toBeDefined();
  });

  it('when XRAY_DISABLED is undefined and NODE_ENV is not "test"', () => {
    process.env.XRAY_DISABLED = undefined;
    process.env.NODE_ENV = 'dev';

    expect(new AWS.S3()).toBeDefined();
  });
});
