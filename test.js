
///////////////////// IMPORTS //////////////////////////

const AWS = require('aws-sdk');
const awsCredentials = require('./aws-creds.js');
AWS.config.update(awsCredentials);

const util = require('util');

//////////////////// CONSTANTS /////////////////////////

const rekognition = new AWS.Rekognition();
const BUCKET = 'rekog-test-23';

//////////////////// FUNCTIONS /////////////////////////

function detectFaces(filename) {
  var params = {
    Image: {
      S3Object: {
        Bucket: BUCKET,
        Name: filename
      }
    }
  };

  rekognition.detectFaces(params, function(err, data) {
    if (err) console.log(err, err.stack); 
    else {
      console.log("\nDETECT FACES:");
      console.log(util.inspect(data, {depth: null, colors: true}));
    }
  });
}

function compareFaces(sourceImage, targetImage) {
  var params = {
    SourceImage: {
      S3Object: {
        Bucket: BUCKET,
        Name: sourceImage
      }
    },
    TargetImage: {
      S3Object: {
        Bucket: BUCKET,
        Name: targetImage
      }
    }
  };

  rekognition.compareFaces(params, function(err, data) {
    if (err) console.log(err, err.stack); 
    else {
      console.log("\nCOMPARE FACES:");
      console.log(util.inspect(data, {depth: null, colors: true}));
    }
  });
}

function detectLabels(filename) {
  var params = {
    Image: {
      S3Object: {
        Bucket: BUCKET,
        Name: filename
      }
    }
  };

  rekognition.detectLabels(params, function(err, data) {
    if (err) console.log(err, err.stack); 
    else {
      console.log("\nDETECT LABELS:");
      console.log(util.inspect(data, {depth: null, colors: true}));
    }
  });
}

////////////////////// MAIN //////////////////////////

console.log(`
-----------------------------------------------------------

  This is a test of Amazon's Rekognition service.

  It tests three of AWS' image detection functions:
    1. detectFaces -- identify a face in an image
    2. compareFaces -- compare faces in two images
    3. detectLabels -- find things in images (including but not limited to faces).
  
  See http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Rekognition.html

  The test images are in an s3 bucket called ${BUCKET}.

------------------------------------------------------------ 
`);

detectFaces('head.jpg');
compareFaces('head.jpg', 'black-tee.jpg');
detectLabels('taj.jpg');


