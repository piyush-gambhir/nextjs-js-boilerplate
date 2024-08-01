import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Upload } from "@aws-sdk/lib-storage";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function uploadFileToBucket(file, filename) {
  const Key = filename;
  const Bucket = process.env.AWS_BUCKET_NAME;

  let res;

  try {
    const parallelUploads = new Upload({
      client: s3Client,
      params: {
        Bucket,
        Key,
        Body: file,
        ACL: "public-read",
        ContentType: file.type,
      },
      queueSize: 4,
      leavePartsOnError: false,
    });

    res = await parallelUploads.done();
  } catch (e) {
    throw e;
  }

  return res;
}

export async function getDownloadUrl(objectName) {
  return getSignedUrl(
    s3Client,
    new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: objectName,
    }),
    { expiresIn: 3600 },
  );
}

export async function getPresignedPostUrl(objectName, contentType) {
  return await createPresignedPost(s3Client, {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: objectName,
    Conditions: [
      ["content-length-range", 0, 1024 * 1024 * 2], // 2 MB limit
      ["starts-with", "$Content-Type", contentType],
    ],
    Expires: 600, // 10 minutes
    Fields: {
      "Content-Type": contentType,
    },
  });
}

export async function getFileUrl(key) {
  const url = await getSignedUrl(
    s3Client,
    new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
    }),
    { expiresIn: 3600 }, // 1 hour
  );
  return url;
}
