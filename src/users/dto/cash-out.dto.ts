import { IsNumber, } from "class-validator";

export class CashOutDto {

    @IsNumber()
    amoute: number;
}