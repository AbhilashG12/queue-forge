// import express ,{type Express} from "express";
// import { PrismaUserRepo } from "./infrastructure/db/PrismaUserRepo.js";
// import { ArgonHasher } from "./infrastructure/security/ArgonHasher.js";
// import { RegisterUser } from "./application/use-cases/RegisterUser.js";
// import { AuthController } from "./interfaces/controller/AuthController.js";

// export const app :Express = express();

// app.use(express.json());

// const userRepo = new PrismaUserRepo();
// const hasher = new ArgonHasher();
// const registerUSer = new RegisterUser(userRepo,hasher);
// const authController = new AuthController(registerUSer);

// app.post("/auth/register",(req,res,next)=>authController.register(req,res,next));

// app.get('/health', (req, res) => res.send('OK'));

// app.use((err: any, req: any, res: any, next: any) => {
//   const status = err.statusCode || 500;
//   res.status(status).json({ error: err.message || 'Internal Server Error' });
// });



import express ,{type Express} from "express";
import { PrismaUserRepo } from "./infrastructure/db/PrismaUserRepo.js";
import { ArgonHasher } from "./infrastructure/security/ArgonHasher.js";
import { RegisterUser } from "./application/use-cases/RegisterUser.js";
import { AuthController } from "./interfaces/controller/AuthController.js";

export const app :Express = express();

app.use(express.json());

const userRepo = new PrismaUserRepo();
const hasher = new ArgonHasher();
const registerUSer = new RegisterUser(userRepo,hasher);
const authController = new AuthController(registerUSer);

app.post("/auth/register",(req,res,next)=>authController.register(req,res,next));

app.get('/health', (req, res) => res.send('OK'));

app.use((err: any, req: any, res: any, next: any) => {
  const status = err.statusCode || 500;
  res.status(status).json({ error: err.message || 'Internal Server Error' });
});

