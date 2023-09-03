import express, { Router } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { reqLogger, resourceNotFoundError } from "../utils";
import session from "express-session";

export const server = (
  port: string | number,
  router: Router,
  baseUrl = "/"
) => {
  const app = express();

  app.use(cors());
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: false, limit: "50mb" }));
  app.use(
    session({
      resave: false,
      saveUninitialized: true,
      secret: "SECRET",
      cookie: { secure: true },
    })
  );
  app.use(reqLogger);

  router.get("/health", (req, res) => {
    res.status(200).send({ success: true, message: "successful" });
  });

  app.use(baseUrl || "/", router);

  app.use((req, res) => {
    res.status(404).send({ success: false, message: resourceNotFoundError });
  });

  app.listen(port, () => {
    console.info(`Listening on port ${port}`);
  });
};
