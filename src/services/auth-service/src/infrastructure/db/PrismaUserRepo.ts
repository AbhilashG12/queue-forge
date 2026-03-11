import * as mariadb from 'mariadb';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../../generated/prisma/client.js';
import { type IUserRepo } from "../../domain/repos/IUserRepo.js";
import { User } from "../../domain/entities/User.js";

export class PrismaUserRepo implements IUserRepo {
  private prisma: PrismaClient;

  constructor() {
    const pool = mariadb.createPool({
      host: '127.0.0.1',           
      port: 3306,
      user: 'root',
      password: 'root', 
      database: 'auth_db',
      connectionLimit: 10,
      connectTimeout: 10000,
      allowPublicKeyRetrieval: true,
      checkNoPassword: true,
    }) as any;

    const adapter = new PrismaMariaDb(pool);
    this.prisma = new PrismaClient({ adapter });
  }

  async findByEmail(email: string): Promise<User | null> {
    const data = await this.prisma.user.findUnique({ where: { email } });
    if (!data) return null;
    return new User({ ...data, role: data.role as "user" | "admin" });
  }

  async findById(id: string): Promise<User | null> {
    const data = await this.prisma.user.findUnique({ where: { id } });
    if (!data) return null;
    return new User({ ...data, role: data.role as "user" | "admin" });
  }

  async save(user: User): Promise<void> {
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