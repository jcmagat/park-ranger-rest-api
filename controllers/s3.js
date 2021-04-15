const S3 = require("aws-sdk/clients/s3");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_BUCKET_ACCESS_KEY;
const secretAccessKey = process.env.AWS_BUCKET_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

exports.getFileStream = (key) => {
  const params = {
    Key: key,
    Bucket: bucketName,
  };

  return s3.getObject(params).createReadStream();
};
