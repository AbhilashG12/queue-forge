import { User } from "../entities/User.js";

export interface IUserRepo{
    findByEmail(email:string):Promise<User|null>;
    findById(id:string):Promise<User|null>;
    save(user:User):Promise<void>;
}
