import { Injectable } from '@nestjs/common';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

@Injectable()
export class AuthService {
  private users: User[] = [
    {
      id: '1',
      name: 'Service Agent 1',
      email: 'sa1@mail.com',
      password: '123456',
      role: 'agent',
    },
    {
      id: '2',
      name: 'Service Agent 2',
      email: 'sa2@gmail.com',
      password: '123456',
      role: 'agent',
    },
    {
      id: '3',
      name: 'User 1',
      email: 'user1@mail.com',
      password: '123456',
      role: 'user',
    },
    {
      id: '4',
      name: 'User 2',
      email: 'user2@mail.com',
      password: '123456',
      role: 'user',
    },
    {
      id: '5',
      name: 'Provider 1',
      email: 'provider@mail.com',
      password: '123456',
      role: 'provider',
    },
    {
      id: '6',
      name: 'Provider 2',
      email: 'provider2@mail.com',
      password: '123456',
      role: 'provider',
    },
  ];

  login(email: string, password: string) {
    const user = this.users.find(
      (user) => user.email === email && user.password === password,
    );

    if (user) {
      return user;
    }

    return null;
  }

  getUser(id: string) {
    return this.users.find((user) => user.id === id);
  }
}
