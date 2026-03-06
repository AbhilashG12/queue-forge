export interface UserProps {
    id : string,
    email : string,
    passwordHash : string,
    role : "user" | "admin",
    createdAt : Date,
}

export class User {
    constructor(public readonly props : UserProps){}

    public isAdmin():boolean{
        return this.props.role === 'admin';
    }
}