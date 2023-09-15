import { Body, Controller, Post, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpDto } from "./dtos";
import { LocalGuard } from "./guard";
import { GetUser } from "./decorator";
import { User } from "src/users/entities";
import { Response } from "express";

@Controller("api/v1/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post("sign-up")
  async signUp(@Body() dto: SignUpDto) {
    return this.authService.signUp(dto);
  }
  @Post("sign-in")
  @UseGuards(LocalGuard)
  async signIn(
    @GetUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const msg = await this.authService.signIn(user, res);
    res.send(msg);
  }
}
