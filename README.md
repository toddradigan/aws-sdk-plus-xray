# AWS SDK plus X-Ray

## Install

```bash
npm install --save aws-sdk-plus-xray
npm install --save-dev aws-sdk
```

## Usage
Able to pass config options, `logger`, `rules`, and `daemonAddress` to X-Ray. See (here)[http://docs.aws.amazon.com/xray/latest/devguide/xray-sdk-nodejs-configuration.html] for details about these options.

```js
const AWS = require('aws-sdk-plus-xray')({});
```

### Disabling X-Ray support

Useful when running tests.

```bash
XRAY_DISABLED="true"
```
