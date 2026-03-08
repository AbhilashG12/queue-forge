
export interface UserProps {
  id?: string;
  email: string;
  passwordHash: string;
  role?: 'user' | 'admin';
  createdAt?: Date;
}

export class User {
  public readonly props: {
    id: string;
    email: string;
    passwordHash: string;
    role: 'user' | 'admin';
    createdAt: Date;
  };

  constructor(props: UserProps) {
    this.props = {
      email: props.email,
      passwordHash: props.passwordHash,
      id: props.id ?? Math.random().toString(36).substring(7), 
      role: props.role ?? 'user',
      createdAt: props.createdAt ?? new Date(),
    };
  }
}