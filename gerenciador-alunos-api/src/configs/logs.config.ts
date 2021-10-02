import {
  utilities as nestWinstonModuleUtilities,
  WinstonModuleOptions,
} from 'nest-winston';
import * as winston from 'winston';

export const logConfig: WinstonModuleOptions = {
  levels: winston.config.npm.levels,
  level: 'info',

  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        nestWinstonModuleUtilities.format.nestLike(),
      ),
    }),
    new winston.transports.File({
      level: 'info',
      filename: 'application.log',
      dirname: 'logs',
    }),
  ],
};
