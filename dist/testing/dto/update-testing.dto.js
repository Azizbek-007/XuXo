"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTestingDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_testing_dto_1 = require("./create-testing.dto");
class UpdateTestingDto extends (0, mapped_types_1.PartialType)(create_testing_dto_1.CreateTestingDto) {
}
exports.UpdateTestingDto = UpdateTestingDto;
//# sourceMappingURL=update-testing.dto.js.map