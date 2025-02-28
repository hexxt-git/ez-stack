// utils/minioClient.ts
import { Client } from "minio";

export const minioClient = new Client({
    endPoint: process.env.S3_ENDPOINT!.replace(/^https?:\/\//, ""), // Remove protocol
    port: process.env.S3_ENDPOINT!.startsWith("https") ? 443 : 80,
    useSSL: process.env.S3_ENDPOINT!.startsWith("https"),
    accessKey: process.env.S3_ACCESS_KEY!,
    secretKey: process.env.S3_SECRET_KEY!,
    region: process.env.S3_REGION!,
});
