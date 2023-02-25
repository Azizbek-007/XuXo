import { BaseEntity } from "typeorm";
import Leads from "./Lead";
export default class Leads_Category extends BaseEntity {
    id: number;
    name: string;
    lead: Leads;
    leadId: number;
}
