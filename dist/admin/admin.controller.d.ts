import { AdminService } from './admin.service';
import { CreateReferalDto } from './dto/create-referal.dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    allReferal(): Promise<import("../utils/typeorm").Referals[]>;
    createReferal(dto: CreateReferalDto): Promise<void>;
}
