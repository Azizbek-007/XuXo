import { TestingService } from './testing.service';
import { CreateTestingDto } from './dto/create-testing.dto';
import { UpdateTestingDto } from './dto/update-testing.dto';
export declare class TestingController {
    private readonly testingService;
    constructor(testingService: TestingService);
    create(createTestingDto: CreateTestingDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateTestingDto: UpdateTestingDto): string;
    remove(id: string): string;
}
