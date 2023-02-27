import { Controller, Get, Post, Body, Param, UseInterceptors, UploadedFile, Delete, UseGuards } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './s3.service';
import { FileStorage } from './file.storage';
import { JwtAuthGuard } from 'src/auth/utils/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/auth/utils/role/roles.guard';
import { Roles } from 'src/auth/utils/role/roles.decorator';
import { Role } from 'src/utils/types';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('services')
export class ServicesController {
  constructor(
    private readonly servicesService: ServicesService,
    private readonly FileUploadService: FileUploadService
    ) {}

  @Roles(Role.Admin)
  @Post()
  @UseInterceptors(FileInterceptor('image', FileStorage))
  async sendMesage(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateServiceDto
  ) {
    let aws_s3_location: string;
    file ? (aws_s3_location = await this.FileUploadService.upload(file)) : null;
    dto.image = aws_s3_location;
    return this.servicesService.create(dto);
  }

  @Get()
  findAll() {
    return this.servicesService.findAll();
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(+id);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.servicesService.delete(+id);
  }


}
