import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { GetUser } from "src/auth/decorator";
import { CreateGuidanceServiceDto, ListGuidesDto } from "./dto";
import { Guide } from "./entities";
import { GuidesService } from "./guides.service";
import { User } from "src/users/entities";
import { JwtGuard } from "src/auth/guard";
import { ListGuidePipe } from "./pipes";

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

  @Get()
  async list(@Query(new ListGuidePipe()) dto: ListGuidesDto) {
    return this.guidesService.listGuides(dto);
  }

  @Get("/:id")
  async findGuideById(@Param("id") id: string) {
    return this.guidesService.findGuideById(id);
  }
}
