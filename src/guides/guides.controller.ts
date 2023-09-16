import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { GetUser } from "src/auth/decorator";
import { CreateGuidanceServiceDto } from "./dto";
import { Guide } from "./entities";
import { GuidesService } from "./guides.service";
import { User } from "src/users/entities";
import { JwtGuard } from "src/auth/guard";

@Controller("api/v1/guides")
export class GuidesController {
  constructor(private readonly guidesService: GuidesService) {}
  @Post()
  @UseGuards(JwtGuard)
  async create(
    @GetUser() user: User,
    @Body() dtos: CreateGuidanceServiceDto[],
  ): Promise<Guide> {
    return this.guidesService.create(user, dtos);
  }
}
