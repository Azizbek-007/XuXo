import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiRes } from 'src/utils/payloadRes';
import { Service } from 'src/utils/typeorm';
import { Repository } from 'typeorm';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service) private ServiceRepository: Repository<Service>,
  ) {}

  async create(createServiceDto: CreateServiceDto) {
    const new_service = this.ServiceRepository.create(createServiceDto)
    const data = await new_service.save();
    return ApiRes('Successfuly created', HttpStatus.CREATED, data);
  }

  async findAll() {
    const all_services = await this.ServiceRepository.find();
    if (all_services.length == 0) {
      return ApiRes('Not found services', HttpStatus.NOT_FOUND);
    }
    return ApiRes('Services', HttpStatus.OK, all_services);
  }

  async findOne(id: number) {
    const service = await this.ServiceRepository.findOneBy({ id });
    if (!service) {
      return ApiRes('Not found service', HttpStatus.NOT_FOUND);
    }
    return ApiRes('Services', HttpStatus.OK, service);
  }

  async delete(id: number) {
    const service = await this.ServiceRepository.findOneBy({ id });
    if (!service) {
      return ApiRes('Not found service', HttpStatus.NOT_FOUND);
    }
    await service.remove();
    return ApiRes('Successfuly deleted', HttpStatus.OK);
  }
}
 