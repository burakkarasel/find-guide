import { Injectable } from "@nestjs/common";
import { User } from "./entities";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async create(user: User) {
    return this.usersRepository.insert(user);
  }
}
