import { type IUserRepo } from '../../domain/repos/IUserRepo.js';
import {ConflictError} from "@platform/errors/src/index.js" 
import { User as UserClass } from "../../domain/entities/User.js"

interface RegisterRequest{
    email : string;
    passwordRaw : string;
}

export class RegisterUser{
    constructor(
        private userRepo : IUserRepo,
        private passwordHasher : any
    ){}

    async execute(request:RegisterRequest) :Promise<void>{
        const exists = await this.userRepo.findByEmail(request.email);
        if(exists) throw new ConflictError("User Already Exists !");

        const hashed = await this.passwordHasher.hash(request.passwordRaw);

        const user = new UserClass({
            id : crypto.randomUUID(),
            email : request.email,
            passwordHash : hashed,
            role : "user",
            createdAt : new Date(),
        })

        await this.userRepo.save(user);
    }
}