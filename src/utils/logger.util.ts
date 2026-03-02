import winston from "winston";

const isDevelopment = process.env.NODE_ENV === "development";

export const logger = winston.createLogger({
  level: isDevelopment ? "debug" : "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(
          ({ timestamp, level, message, ...meta }) =>
            `${timestamp as string} [${level}]: ${message as string} ${
              Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ""
            }`
        )
      ),
      silent: !isDevelopment,
    }),
  ],
});
