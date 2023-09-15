import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpDto } from "./dtos";

@Controller("api/v1/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post("sign-up")
  async signUp(@Body() dto: SignUpDto) {
    return this.authService.signUp(dto);
  }
}
