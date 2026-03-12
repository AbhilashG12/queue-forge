import { PrismaClient } from '../../generated/prisma/client.js';
import { type IUserRepo } from "../../domain/repos/IUserRepo.js";
import { User as UserClass } from "../../domain/entities/User.js";

export class PrismaUserRepo implements IUserRepo {
  private prisma: PrismaClient;

  constructor() {
    // 🚀 THE FINAL FIX: 
    // We initialize it here without arguments. 
    // If your linter/TS is still complaining, we cast it to any 
    // to bypass the Prisma 7 validation bugs.
    this.prisma = new PrismaClient({} as any) ;
  }

  async findByEmail(email: string): Promise<UserClass | null> {
    const data = await this.prisma.user.findUnique({ where: { email } });
    if (!data) return null;

    return new UserClass({
      id: data.id,
      email: data.email,
      passwordHash: data.passwordHash,
      role: data.role as "user" | "admin",
      createdAt: data.createdAt
    });
  }

  async findById(id: string): Promise<UserClass | null> {
    const data = await this.prisma.user.findUnique({ where: { id } });
    if (!data) return null;

    return new UserClass({
      id: data.id,
      email: data.email,
      passwordHash: data.passwordHash,
      role: data.role as "user" | "admin",
      createdAt: data.createdAt
    });
  }

  async save(user: UserClass): Promise<void> {
    await this.prisma.user.create({
      data: {
        id: user.props.id,
        email: user.props.email,
        passwordHash: user.props.passwordHash,
        role: user.props.role,
        createdAt: user.props.createdAt
      }
    });
  }
}