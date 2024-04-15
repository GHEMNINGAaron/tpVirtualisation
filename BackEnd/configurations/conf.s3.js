const aws = require("aws-sdk")

const s3 = new aws.S3({
    endpoint: 'http://localhost:4566',
    s3ForcePathStyle: true, 
    signatureVersion: 'v4',
    region:"eu-central-1",
    credentials: new aws.Credentials({
        accessKeyId: 'key_aws1',
        secretAccessKey: 'key_aws1'
    }),
});

module.exports = {s3} ;