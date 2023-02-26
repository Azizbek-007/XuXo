import { isActive } from "src/utils/types";
export declare class QueryDto {
    take: number;
    page: number;
    IsActive: isActive;
}
export declare class isActiveDto {
    active: number;
    id: number;
}
