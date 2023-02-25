

import { S3 } from 'aws-sdk';
import { Logger, Injectable } from '@nestjs/common';

@Injectable()
export class FileUploadService {
  async upload(file) {
    const { originalname, mimetype } = file;
    const bucketS3 = process.env.AWS_BUCKED_NAME;
    const data = await this.uploadS3(
      file.buffer,
      bucketS3,
      originalname,
      mimetype,
    );
    return data['Location'];
  }

  async uploadS3(file, bucket, name, mimetype) {
    return new Promise((resolve, reject) => {
      const s3 = new S3({
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      });

      s3.upload(
        {
          Bucket: bucket,
          Key: String(name),
          Body: file,
          ContentType: String(mimetype),
        },
        (err, data) => {
          if (err) reject(err.message);
          resolve(data);
        },
      );
    });
  }
}