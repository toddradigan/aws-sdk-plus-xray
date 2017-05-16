const AWS = require('../');

describe('NODE_ENV is "dev"', () => {
  beforeEach(() => {
    process.env.NODE_ENV = 'dev';
  });

  it('exports aws-sdk wrapped with the aws-xray-sdk', () => {
    expect(new AWS.S3()).toBeDefined();
  });
});
