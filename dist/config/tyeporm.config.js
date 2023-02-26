"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmConfig = void 0;
const dotenv = require("dotenv");
const typeorm_1 = require("../utils/typeorm");
dotenv.config();
exports.TypeOrmConfig = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: typeorm_1.default,
    synchronize: true,
    logging: false
};
//# sourceMappingURL=tyeporm.config.js.map