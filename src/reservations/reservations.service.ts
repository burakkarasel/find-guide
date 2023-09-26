import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { ReservationsRepository } from "./reservations.repository";
import { CreateReservationDto } from "./dto";
import { User } from "src/users/entities";
import { Reservation } from "./entity";
import { GuidanceServiceService } from "src/guidance-service/guidance-service.service";
import { GuidesService } from "src/guides/guides.service";

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
    private readonly guidanceServiceService: GuidanceServiceService,
    private readonly guideService: GuidesService,
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

  async updateReservationApprovement(
    reservationId: string,
    userId: string,
  ): Promise<Reservation> {
    const reservation = await this.findReservationById(reservationId);
    const guide = await this.guideService.findGuideByUserId(userId);
    if (reservation.guide.id !== guide.id) {
      this.logger.warn(
        `Guide with ID: ${guide.id} tried to update another guide's reservation with ID: ${reservationId}`,
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
