import { IsNotEmpty, IsPassportNumber, IsPhoneNumber, IsString, MaxLength, MinLength } from "class-validator";
import { CreateUserDetails } from "src/utils/types";

export class CreateUserDto implements CreateUserDetails {

    @IsString()
    first_name: string;

    @IsString()
    last_name: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(32)
    password: string;

    @IsNotEmpty()
    @IsString()
    passport_number: string;

    @IsNotEmpty()
    @IsPhoneNumber('UZ')
    phone_number: string;

    @IsString()
    adress: string;

    @IsString()
    @MinLength(14)
    @MaxLength(14)
    pinfl: string;
}
