import "dotenv/config";
import router from "./routes";
import { server } from "./core";

server(process.env.PORT ?? 3000, router);
