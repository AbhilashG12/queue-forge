import {app} from "./app.js";
import {logger} from "@platform/logger"

const PORT = process.env.PORT || 8001;

app.listen(PORT,()=>{console.log("Auth Service started")});
