import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { JwtPayload } from "../types";
import { User } from "src/users/entities";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req.cookies?.accessToken;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow("ACCESS_TOKEN_SECRET_KEY"),
    });
  }

  async validate({ sub }: JwtPayload): Promise<User> {
    try {
      return this.usersService.findUserById(sub);
    } catch (error) {
      throw new UnauthorizedException("Hello there");
    }
  }
}
