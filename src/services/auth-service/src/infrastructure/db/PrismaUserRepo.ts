// import { PrismaClient } from '@prisma/client'; 
// import { type IUserRepo } from "../../domain/repos/IUserRepo.js";
// import { User as UserClass } from "../../domain/entities/User.js";

// export class PrismaUserRepo implements IUserRepo {
//   private prisma: PrismaClient;

//   constructor() {
//     this.prisma = new PrismaClient({});
//   }

//   async findByEmail(email: string): Promise<UserClass | null> {
//     const data = await this.prisma.user.findUnique({ where: { email } });
//     if (!data) return null;
//     return this.mapToDomain(data);
//   }

//   async findById(id: string): Promise<UserClass | null> {
//     const data = await this.prisma.user.findUnique({ where: { id } });
//     if (!data) return null;
//     return this.mapToDomain(data);
//   }

//   async save(user: UserClass): Promise<void> {
//     // Upsert is safer for MongoDB to prevent duplicate ID crashes
//     await this.prisma.user.upsert({
//       where: { id: user.props.id },
//       update: {
//         email: user.props.email,
//         passwordHash: user.props.passwordHash,
//         role: user.props.role,
//       },
//       create: {
//         id: user.props.id,
//         email: user.props.email,
//         passwordHash: user.props.passwordHash,
//         role: user.props.role,
//         createdAt: user.props.createdAt
//       }
//     });
//   }

//   private mapToDomain(data: any): UserClass {
//     return new UserClass({
//       id: data.id,
//       email: data.email,
//       passwordHash: data.passwordHash,
//       role: data.role as "user" | "admin",
//       createdAt: data.createdAt
//     });
//   }
// }

import { PrismaClient } from '@prisma/client'; 
import { type IUserRepo } from "../../domain/repos/IUserRepo.js";
import { User as UserClass } from "../../domain/entities/User.js";

export class PrismaUserRepo implements IUserRepo {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({});
  }

  async findByEmail(email: string): Promise<UserClass | null> {
    const data = await this.prisma.user.findUnique({ where: { email } });
    if (!data) return null;
    return this.mapToDomain(data);
  }

  async findById(id: string): Promise<UserClass | null> {
    const data = await this.prisma.user.findUnique({ where: { id } });
    if (!data) return null;
    return this.mapToDomain(data);
  }

  async save(user: UserClass): Promise<void> {
    // Upsert is safer for MongoDB to prevent duplicate ID crashes
    await this.prisma.user.upsert({
      where: { id: user.props.id },
      update: {
        email: user.props.email,
        passwordHash: user.props.passwordHash,
        role: user.props.role,
      },
      create: {
        id: user.props.id,
        email: user.props.email,
        passwordHash: user.props.passwordHash,
        role: user.props.role,
        createdAt: user.props.createdAt
      }
    });
  }

  private mapToDomain(data: any): UserClass {
    return new UserClass({
      id: data.id,
      email: data.email,
      passwordHash: data.passwordHash,
      role: data.role as "user" | "admin",
      createdAt: data.createdAt
    });
  }
}