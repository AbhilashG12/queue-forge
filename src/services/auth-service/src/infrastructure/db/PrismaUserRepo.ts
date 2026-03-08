import { PrismaClient } from "../../generated/prisma/client.js";
import { type IUserRepo } from '../../domain/repos/IUserRepo.js';
import { User } from '../../domain/entities/User.js';

export class PrismaUserRepo implements IUserRepo {
 
  private prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL
  } as any);

  async findByEmail(email: string): Promise<User | null> {
    const data = await this.prisma.user.findUnique({ where: { email } });
    if (!data) return null;
    return new User({
      ...data,
      role: data.role as "user" | "admin"
    });
  }

  async findById(id: string): Promise<User | null> {
    const data = await this.prisma.user.findUnique({ where: { id } });
    if (!data) return null;

    return new User({
      ...data,
      role: data.role as "user" | "admin"
    });
  }

  async save(user: User): Promise<void> {
    await this.prisma.user.create({
      data: {
        id: user.props.id,
        email: user.props.email,
        passwordHash: user.props.passwordHash,
        role: user.props.role,
        createdAt: user.props.createdAt, 
      }
    });
  }
}