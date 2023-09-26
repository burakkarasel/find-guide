import { Module } from "@nestjs/common";
import { GuidanceServiceService } from "./guidance-service.service";
import { GuidanceServiceRepository } from "./guidance-service.repository";
import { DatabaseModule } from "src/database/database.module";
import { GuidanceService } from "./entity";

@Module({
  imports: [DatabaseModule, DatabaseModule.forFeature([GuidanceService])],
  providers: [GuidanceServiceService, GuidanceServiceRepository],
  exports: [GuidanceServiceService],
})
export class GuidanceServiceModule {}
