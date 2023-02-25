import { BaseEntity } from "typeorm";
import Employee from "./Employee";
export declare class Company extends BaseEntity {
    id: number;
    about: string;
    balance_mode: number;
    end_of_working_day: string;
    lessons_per_month: number;
    name: string;
    number_of_lessons_status: number;
    phone: string;
    salary_calculation_mode: number;
    settings: string;
    start_of_working_day: string;
    subdomain: string;
    author: Employee;
    authorId: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
