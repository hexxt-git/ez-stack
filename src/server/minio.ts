// utils/minioClient.ts
import { Client } from "minio";

export const minioClient = new Client({
    endPoint: process.env.S3_ENDPOINT!.replace(/https?:\/\//, ""),
    accessKey: process.env.S3_ACCESS_KEY,
    secretKey: process.env.S3_SECRET_KEY,
});
