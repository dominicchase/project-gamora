const { S3 } = require("aws-sdk");

const s3_v2 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

module.exports = {
  s3_uploadImage_v2: async (files) => {
    const imageData = files.map(({ originalname, buffer }) => ({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${originalname}`,
      Body: buffer,
    }));

    return await Promise.all(
      imageData.map((imageDatum) => s3_v2.upload(imageDatum).promise())
    );
  },

  s3_getImage_v2: async (fileName) => {
    const imageData = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
    };

    return await s3_v2.getObject(imageData);
  },
};
