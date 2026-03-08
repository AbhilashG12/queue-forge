import { type Request, type Response , type NextFunction } from 'express';
import { z } from 'zod';
import { RegisterUser } from '@/application/use-cases/RegisterUser.js';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export class AuthController {
  constructor(private registerUser: RegisterUser) {}

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const data = registerSchema.parse(req.body);
      await this.registerUser.execute({
        email: data.email,
        passwordRaw: data.password,
      });
      return res.status(201).json({ 
        message: 'User created successfully',
        status: 'success'
      });
    } catch (error) {
      next(error);
    }
  }
}