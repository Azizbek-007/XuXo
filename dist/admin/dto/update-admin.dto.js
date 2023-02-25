"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAdminDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_referal_dto_1 = require("./create-referal.dto");
class UpdateAdminDto extends (0, mapped_types_1.PartialType)(create_referal_dto_1.CreateReferalDto) {
}
exports.UpdateAdminDto = UpdateAdminDto;
//# sourceMappingURL=update-admin.dto.js.map