"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter({
        logger: true
    }), {
        cors: true,
        bodyParser: true
    });
    app.setGlobalPrefix('/v1/api');
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true }));
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map