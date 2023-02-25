import { BaseEntity } from "typeorm";
import { Company } from "./Company";
import Employee from "./Employee";
export declare class Branches extends BaseEntity {
    id: number;
    is_recalculation_on: number;
    name: string;
    logo: string;
    employee: Employee;
    company: Company;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
