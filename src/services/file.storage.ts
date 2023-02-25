import { HttpException, HttpStatus } from "@nestjs/common";
import { extname } from "path";

export const FileStorage = {
    limits: {
      fileSize: 1024 * 1024 * 5,
    },

    fileFilter: (req: any, file: any, cb: any) => {

      if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
        const image_format = String(file.mimetype).split('/')[1];
        file.originalname = Date.now() + '.' +image_format;
        cb(null, true);
      } else {
        cb(
            new HttpException({
                message: `Unsupported file type ${extname(file.originalname)}`
            },
            HttpStatus.BAD_REQUEST,
          ),
          false
        );
      }
    },
  }