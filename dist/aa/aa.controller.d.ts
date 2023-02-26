import { AaService } from './aa.service';
import { CreateAaDto } from './dto/create-aa.dto';
import { UpdateAaDto } from './dto/update-aa.dto';
export declare class AaController {
    private readonly aaService;
    constructor(aaService: AaService);
    create(createAaDto: CreateAaDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateAaDto: UpdateAaDto): string;
    remove(id: string): string;
}
