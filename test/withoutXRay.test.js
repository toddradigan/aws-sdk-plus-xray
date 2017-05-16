describe('NODE_ENV is "test"', () => {
  beforeEach(() => {
    process.env.NODE_ENV = 'test';
  });

  it('exports the default aws-sdk', () => {
    const AWS = require('../'); // eslint-disable-line
    expect(new AWS.S3()).toBeDefined();
  });
});
