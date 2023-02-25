import { IsNumber } from "class-validator";

export class CreateReferalDto {

    @IsNumber()
    customerId: number;

    @IsNumber()
    referal: number;

}
