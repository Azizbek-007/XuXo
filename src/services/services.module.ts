import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from 'src/utils/typeorm';
import { FileUploadService } from './s3.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Service ])
  ],
  controllers: [ServicesController],
  providers: [ServicesService, FileUploadService]
})
export class ServicesModule {}
 