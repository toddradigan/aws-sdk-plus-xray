describe('exports the default aws-sdk', () => {
  it('when XRAY_DISABLED is \'true\'', () => {
    process.env.XRAY_DISABLED = 'true';
    process.env.NODE_ENV = 'dev';

    const AWS = require('../'); // eslint-disable-line
    expect(new AWS.S3()).toBeDefined();
  });

  it('when XRAY_DISABLED is undefined and NODE_ENV is "test"', () => {
    process.env.XRAY_DISABLED = undefined;
    process.env.NODE_ENV = 'test';

    const AWS = require('../'); // eslint-disable-line
    expect(new AWS.S3()).toBeDefined();
  });
});
