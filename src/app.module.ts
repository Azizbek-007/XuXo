import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { TypeOrmConfig } from './config/tyeporm.config';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    AuthModule, 
    UsersModule, AdminModule, ServicesModule
  ]
})
export class AppModule {}
