import { IsEnum, IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";
import { isActive } from "src/utils/types";

export class QueryDto {
    @IsOptional()
    take: number;

    @IsOptional()
    page: number;
    
    @IsOptional()
    IsActive: isActive;
}

export class isActiveDto {

    @IsOptional()
    @IsNumberString()
    active: number

    @IsOptional()
    @IsNumberString()
    id: number
}