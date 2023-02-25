/// <reference types="multer" />
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { FileUploadService } from './s3.service';
export declare class ServicesController {
    private readonly servicesService;
    private readonly FileUploadService;
    constructor(servicesService: ServicesService, FileUploadService: FileUploadService);
    sendMesage(file: Express.Multer.File, dto: CreateServiceDto): Promise<void>;
    findAll(): Promise<void>;
    findOne(id: string): Promise<void>;
    delete(id: string): Promise<void>;
}
