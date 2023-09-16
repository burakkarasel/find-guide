import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";
import { JwtPayload } from "../types";
import { User } from "src/users/entities";
import { UsersService } from "src/users/users.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, "refresh") {
  constructor(
    private readonly usersService: UsersService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request.cookies?.refreshToken;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow("REFRESH_TOKEN_SECRET_KEY"),
    });
  }

  async validate({ sub }: JwtPayload): Promise<User> {
    try {
      return this.usersService.findUserById(sub);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
