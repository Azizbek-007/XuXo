import { IsEnum, IsNumber } from "class-validator";
import { PaymetRole } from "src/utils/types";

export default class PaymetStatusDto {
    @IsEnum(PaymetRole)
    status: PaymetRole;

    @IsNumber()
    customer: number;

    @IsNumber()
    order_id: number;
}