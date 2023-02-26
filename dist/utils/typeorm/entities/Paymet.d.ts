import { PaymetRole } from "src/utils/types";
import { BaseEntity } from "typeorm";
import { Users } from "./User";
export declare class Paymets extends BaseEntity {
    id: number;
    customer: Users;
    customerId: number;
    amoute: number;
    status: PaymetRole;
    created_at: Date;
}
