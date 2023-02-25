import { IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class CreateServiceDto {
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    image: string;

    @IsString()
    @IsPhoneNumber('UZ')
    phone: string;
}
