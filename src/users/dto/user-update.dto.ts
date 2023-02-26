import { IsCreditCard, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export default class UpdateUserDto {

    @IsOptional()
    @IsString()
    first_name: string;

    @IsOptional()
    @IsString()
    last_name: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(32)
    password: string;

    @IsOptional()
    @IsString()
    card_number: string;

    @IsOptional()
    @IsString()
    expiration_date: string;
}