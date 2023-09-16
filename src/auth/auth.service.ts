import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { SignUpDto } from "./dtos";
import { User } from "src/users/entities";
import { ConfigService } from "@nestjs/config";
import * as bcryptjs from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import { JwtPayload } from "./types";

@Injectable()
export class AuthService {
  private readonly logger = new Logger();
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
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

  async validateUser(email: string, password: string): Promise<User> {
    try {
      const user = await this.usersService.findUserByEmail(email);
      const compareResult = await bcryptjs.compare(password, user.password);
      if (!compareResult) {
        this.logger.warn(
          `User with ID: ${user.id} tried to sign in with wrong password`,
        );
        throw new UnauthorizedException(
          "User not found with given credentials",
        );
      }
      delete user.password;
      return user;
    } catch (error) {
      this.logger.warn(`User not found with email: ${email}`);
      throw new UnauthorizedException("User not found with given credentials");
    }
  }

  async signIn(user: User, res: Response): Promise<object> {
    const accessToken = await this.signAccessToken(user);
    const refreshToken = await this.signRefreshToken(user);

    let expires = new Date();
    expires.setSeconds(
      expires.getSeconds() +
        this.configService.getOrThrow("ACCESS_TOKEN_EXPIRATION"),
    );
    res.cookie("accessToken", accessToken, { expires, httpOnly: true });

    expires = new Date();
    expires.setSeconds(
      expires.getSeconds() +
        this.configService.getOrThrow("REFRESH_TOKEN_EXPIRATION"),
    );
    res.cookie("refreshToken", refreshToken, { expires, httpOnly: true });
    return { message: "OK" };
  }

  async refresh(user: User, res: Response): Promise<object> {
    const accessToken = await this.signAccessToken(user);

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() +
        this.configService.getOrThrow("ACCESS_TOKEN_EXPIRATION"),
    );
    res.cookie("accessToken", accessToken, { expires, httpOnly: true });

    return { message: "OK" };
  }

  async signAccessToken(user: User): Promise<string> {
    const payload: JwtPayload = { username: user.email, sub: user.id };
    const token = await this.jwtService.signAsync(payload, {
      secret: this.configService.getOrThrow("ACCESS_TOKEN_SECRET_KEY"),
      expiresIn: `${this.configService.getOrThrow("ACCESS_TOKEN_EXPIRATION")}s`,
    });
    return token;
  }

  async signRefreshToken(user: User): Promise<string> {
    const payload: JwtPayload = { username: user.email, sub: user.id };
    const token = await this.jwtService.signAsync(payload, {
      secret: this.configService.getOrThrow("REFRESH_TOKEN_SECRET_KEY"),
      expiresIn: `${this.configService.getOrThrow(
        "REFRESH_TOKEN_EXPIRATION",
      )}s`,
    });
    return token;
  }
}
