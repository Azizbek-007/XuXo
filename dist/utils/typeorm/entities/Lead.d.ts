import { gender, LeadEnum, LeadInvateEnum } from "src/utils/types";
import { BaseEntity } from "typeorm";
import Employee from "./Employee";
import Leads_Category from "./LeadCategory";
export default class Leads extends BaseEntity {
    id: number;
    lead_type: LeadEnum;
    name: string;
    phone: string;
    invate: LeadInvateEnum;
    comment: string;
    gender: gender;
    date_of_birth: string;
    author: Employee;
    authorId: number;
    lead_category: Leads_Category[];
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
