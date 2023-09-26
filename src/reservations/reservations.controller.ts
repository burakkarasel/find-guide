import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ReservationsService } from "./reservations.service";
import { CreateReservationDto } from "./dto";
import { GetUser } from "src/auth/decorator";
import { User } from "src/users/entities";
import { JwtGuard } from "src/auth/guard";

@Controller("api/v1/reservations")
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  @UseGuards(JwtGuard)
  async createReservation(
    @Body() dto: CreateReservationDto,
    @GetUser() user: User,
  ) {
    return this.reservationsService.createReservation(dto, user);
  }
}
