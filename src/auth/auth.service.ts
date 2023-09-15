import { ConflictException, Injectable, Logger } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { SignUpDto } from "./dtos";
import { User } from "src/users/entities";
import { ConfigService } from "@nestjs/config";
import * as bcryptjs from "bcryptjs";

@Injectable()
export class AuthService {
  private readonly logger = new Logger();
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}
  async signUp(dto: SignUpDto): Promise<User> {
    try {
      const password = await bcryptjs.hash(
        dto.password,
        +this.configService.getOrThrow("SALTS"),
      );
      const toCreate = new User({
        ...dto,
        password,
      });
      const user = await this.usersService.create(toCreate);
      delete user.password;
      this.logger.verbose(`Created new user with ID: ${user.id}`);
      return user;
    } catch (error) {
      if (error.code === "23505") {
        this.logger.warn(
          `Couldn't create user with ${dto.email} because: Duplicate email`,
        );
        throw new ConflictException("Credentials are already taken");
      }
      this.logger.fatal(`Unexpected error: ${error.message}`);
      throw error;
    }
  }
}
