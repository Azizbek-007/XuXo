import { CreateTestingDto } from './dto/create-testing.dto';
import { UpdateTestingDto } from './dto/update-testing.dto';
export declare class TestingService {
    create(createTestingDto: CreateTestingDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateTestingDto: UpdateTestingDto): string;
    remove(id: number): string;
}
