const { S3 } = require("aws-sdk");

const s3_v2 = new S3();

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

  s3_getImage_v2: async (fileName, expiresIn) => {
    const imageData = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
    };

    return await s3_v2.getObject(imageData);
  },
};

// const {
//     S3Client,
//     GetObjectCommand,
//     PutObjectCommand,
//   } = require("@aws-sdk/client-s3");
// const s3_v3 = new S3Client();
// s3_uploadImage_v3: async (files) => {
//     const imageData = files.map(({ originalname, buffer }) => ({
//       Bucket: process.env.AWS_BUCKET_NAME,
//       Key: `uploads/${originalname}`,
//       Body: buffer,
//     }));

//     return await Promise.all(
//       imageData.map((imageDatum) =>
//         s3_v3.send(new PutObjectCommand(imageDatum))
//       )
//     );
//   },
