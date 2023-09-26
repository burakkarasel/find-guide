import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ReservationsService } from "./reservations.service";
import { CreateReservationDto } from "./dto";
import { GetUser } from "src/auth/decorator";
import { User } from "src/users/entities";
import { GuideGuard, JwtGuard } from "src/auth/guard";
import { Reservation } from "./entity";

@Controller("api/v1/reservations")
@UseGuards(JwtGuard)
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  async createReservation(
    @Body() dto: CreateReservationDto,
    @GetUser() user: User,
  ) {
    return this.reservationsService.createReservation(dto, user);
  }

  @Patch("/:reservationId")
  @UseGuards(GuideGuard)
  async updateReservationApprovement(
    @Param("reservationId") reservationId: string,
    @GetUser() user: User,
  ): Promise<Reservation> {
    return this.reservationsService.updateReservationApprovement(
      reservationId,
      user,
    );
  }

  @Get("/:reservationId")
  async getReservationById(
    @Param("reservationId") reservationId: string,
    @GetUser() user: User,
  ) {
    return this.reservationsService.findReservationDetailsById(
      reservationId,
      user,
    );
  }
}
