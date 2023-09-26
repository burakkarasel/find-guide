import { Injectable } from "@nestjs/common";
import { User } from "./entities";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async create(user: User): Promise<User> {
    return this.usersRepository.insert(user);
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.usersRepository.findOneBy({ email });
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id }, { guide: true });
    delete user.password;
    return user;
  }
}
