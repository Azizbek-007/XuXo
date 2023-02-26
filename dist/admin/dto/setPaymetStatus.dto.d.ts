import { PaymetRole } from "src/utils/types";
export default class PaymetStatusDto {
    status: PaymetRole;
    customer: number;
    order_id: number;
}
