import { PartialType } from '@nestjs/mapped-types';
import { CreateReferalDto } from './create-referal.dto';

export class UpdateAdminDto extends PartialType(CreateReferalDto) {}
