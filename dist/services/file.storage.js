"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileStorage = void 0;
const common_1 = require("@nestjs/common");
const path_1 = require("path");
exports.FileStorage = {
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
            const image_format = String(file.mimetype).split('/')[1];
            file.originalname = Date.now() + '.' + image_format;
            cb(null, true);
        }
        else {
            cb(new common_1.HttpException({
                message: `Unsupported file type ${(0, path_1.extname)(file.originalname)}`
            }, common_1.HttpStatus.BAD_REQUEST), false);
        }
    },
};
//# sourceMappingURL=file.storage.js.map