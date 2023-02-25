import { Service } from 'src/utils/typeorm';
import { Repository } from 'typeorm';
import { CreateServiceDto } from './dto/create-service.dto';
export declare class ServicesService {
    private ServiceRepository;
    constructor(ServiceRepository: Repository<Service>);
    create(createServiceDto: CreateServiceDto): Promise<void>;
    findAll(): Promise<void>;
    findOne(id: number): Promise<void>;
    delete(id: number): Promise<void>;
}
