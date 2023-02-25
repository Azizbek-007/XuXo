export declare class FileUploadService {
    upload(file: any): Promise<any>;
    uploadS3(file: any, bucket: any, name: any, mimetype: any): Promise<unknown>;
}
