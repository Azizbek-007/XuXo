import { CreateAaDto } from './dto/create-aa.dto';
import { UpdateAaDto } from './dto/update-aa.dto';
export declare class AaService {
    create(createAaDto: CreateAaDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateAaDto: UpdateAaDto): string;
    remove(id: number): string;
}
