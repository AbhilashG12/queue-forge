import {app} from "./app.js";
import "dotenv/config.js";
import {logger} from "@platform/logger"


const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
  logger.info(`Auth Service is running on http://localhost:${PORT}`);
});
