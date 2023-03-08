import { AdminService } from './admin.service';
import { CreateReferalDto } from './dto/create-referal.dto';
import { isActiveDto, QueryDto } from './dto/query.dto';
import PaymetStatusDto from './dto/setPaymetStatus.dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    allReferal(query: QueryDto): Promise<void>;
    allUsers(): Promise<void>;
    createReferal(dto: CreateReferalDto): Promise<void>;
    IsActive(query: isActiveDto): Promise<void>;
    PaymetOrder(query: any): Promise<void>;
    SetPaymetStatus(body: PaymetStatusDto): Promise<void>;
}
