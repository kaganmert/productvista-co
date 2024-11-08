import "dotenv/config";
import { createMiddleware } from "@mswjs/http-middleware";
import cors from "cors";
import express from "express";
import logger from "pino-http";

import { env } from "./src/config/env";
import { initializeDb } from "./src/mock/utils/db";
import { handlers } from "./src/mock/handlers";

const app = express();

app.use(
  cors({
    origin: env.APP_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(logger());

initializeDb().then(() => {
  console.log("Mock DB initialized");

  app.use(createMiddleware(...handlers));

  app.listen(Number(env.APP_MOCK_API_PORT), () => {
    console.log(
      `Mock API server started at http://localhost:${env.APP_MOCK_API_PORT}`,
    );
  });
});
