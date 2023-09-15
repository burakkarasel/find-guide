import { Controller, Get, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { GetUser } from "src/auth/decorator";
import { JwtGuard } from "src/auth/guard";
import { User } from "./entities";

@Controller("api/v1/users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  @UseGuards(JwtGuard)
  async findUserById(@GetUser("id") id: string): Promise<User> {
    return this.usersService.findUserById(id);
  }
}
