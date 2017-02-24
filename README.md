
To run the test:

1. clone this repo and `cd` into it
2. add some aws credentials to a file called `aws-creds.js` in the root of the repo:

  ```
  module.exports = {
    accessKeyId: '[access key id]',
    secretAccessKey: '[secret access key]',
    region: 'us-west-2'
  };
  ```
3. `npm install`
4. `npm start`