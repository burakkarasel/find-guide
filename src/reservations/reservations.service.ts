import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { ReservationsRepository } from "./reservations.repository";
import { CreateReservationDto } from "./dto";
import { User } from "src/users/entities";
import { Reservation } from "./entity";
import { GuidanceServiceService } from "src/guidance-service/guidance-service.service";

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
    private readonly guidanceServiceService: GuidanceServiceService,
  ) {}
  private readonly logger = new Logger(ReservationsService.name);

  async createReservation(dto: CreateReservationDto, user: User) {
    const guidanceService =
      await this.guidanceServiceService.findGuidanceServiceById(
        dto.guidanceServiceId,
      );
    this.logger.verbose(
      "Succesfully got the guidance service and the guide with ID: ",
      guidanceService.id,
    );
    const toCreate = new Reservation({
      user,
      guide: guidanceService.guide,
      guidanceService,
      startDate: dto.startDate,
      approved: false,
    });
    const created = await this.reservationsRepository.insert(toCreate);
    this.logger.verbose(
      "Successfully created the reservation with ID: ",
      created.id,
    );
    return this.findReservationById(created.id);
  }

  async findReservationById(id: string): Promise<Reservation> {
    return this.reservationsRepository.findOneBy(
      { id },
      { user: true, guidanceService: true, guide: true },
      {
        user: {
          id: true,
          email: true,
          createdAt: true,
          updatedAt: true,
          phoneNumber: true,
          fullName: true,
        },
        guide: {
          id: true,
          createdAt: true,
          updatedAt: true,
          user: {
            id: true,
            email: true,
            createdAt: true,
            updatedAt: true,
            phoneNumber: true,
            fullName: true,
          },
        },
        guidanceService: {
          id: true,
          pricePerPerson: true,
          duration: true,
          country: true,
          city: true,
        },
      },
    );
  }

  async findReservationDetailsById(
    reservationId: string,
    user: User,
  ): Promise<Reservation> {
    const reservation = await this.findReservationById(reservationId);

    if (
      user.id !== reservation.user.id ||
      user.guide.id !== reservation.guide.id
    ) {
      if (user.guide) {
        this.logger.warn(
          `Guide with ID: ${user.guide.id} tried to fetch another guide's reservation with ID: ${reservationId}`,
        );
      } else {
        this.logger.warn(
          `User with ID: ${user.id} tried to fetch another user's reservation with ID: ${reservationId}`,
        );
      }
      throw new UnauthorizedException("Unathorized for the action");
    }
    return reservation;
  }

  async updateReservationApprovement(
    reservationId: string,
    user: User,
  ): Promise<Reservation> {
    const reservation = await this.findReservationById(reservationId);
    if (reservation.guide.id !== user.guide.id) {
      this.logger.warn(
        `Guide with ID: ${user.guide.id} tried to update another guide's reservation with ID: ${reservationId}`,
      );
      throw new UnauthorizedException("Unathorized for the action");
    }
    reservation.approved = true;
    await this.reservationsRepository.findOneAndUpdate(
      { id: reservationId },
      { ...reservation },
    );
    return reservation;
  }
}
