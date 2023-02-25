import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateReferalDto } from './dto/create-referal.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('referal')
  allReferal(){
    return this.adminService.findAll();
  }

  @Post('referal')
  createReferal(@Body() dto: CreateReferalDto) {
    return this.adminService.createReferal(dto);
  }



  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.adminService.remove(+id);
  // }
}
