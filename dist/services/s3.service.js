"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadService = void 0;
const aws_sdk_1 = require("aws-sdk");
const common_1 = require("@nestjs/common");
let FileUploadService = class FileUploadService {
    async upload(file) {
        const { originalname, mimetype } = file;
        const bucketS3 = process.env.AWS_BUCKED_NAME;
        const data = await this.uploadS3(file.buffer, bucketS3, originalname, mimetype);
        return data['Location'];
    }
    async uploadS3(file, bucket, name, mimetype) {
        return new Promise((resolve, reject) => {
            const s3 = new aws_sdk_1.S3({
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_KEY,
            });
            s3.upload({
                Bucket: bucket,
                Key: String(name),
                Body: file,
                ContentType: String(mimetype),
            }, (err, data) => {
                if (err)
                    reject(err.message);
                resolve(data);
            });
        });
    }
};
FileUploadService = __decorate([
    (0, common_1.Injectable)()
], FileUploadService);
exports.FileUploadService = FileUploadService;
//# sourceMappingURL=s3.service.js.map