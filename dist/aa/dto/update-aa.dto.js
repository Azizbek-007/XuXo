"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAaDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_aa_dto_1 = require("./create-aa.dto");
class UpdateAaDto extends (0, mapped_types_1.PartialType)(create_aa_dto_1.CreateAaDto) {
}
exports.UpdateAaDto = UpdateAaDto;
//# sourceMappingURL=update-aa.dto.js.map