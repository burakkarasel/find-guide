import { Module } from "@nestjs/common";
import { ReservationsController } from "./reservations.controller";
import { ReservationsService } from "./reservations.service";
import { ReservationsRepository } from "./reservations.repository";
import { DatabaseModule } from "src/database/database.module";
import { Reservation } from "./entity";
import { GuidanceServiceModule } from "src/guidance-service/guidance-service.module";
import { GuidesModule } from "src/guides/guides.module";

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([Reservation]),
    GuidanceServiceModule,
    GuidesModule,
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule {}
