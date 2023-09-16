import { Module } from "@nestjs/common";
import { GuidesController } from "./guides.controller";
import { GuidesService } from "./guides.service";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "src/database/database.module";
import { GuidanceService, Guide } from "./entities";
import { GuidesRepository } from "./guides.repository";

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    DatabaseModule.forFeature([Guide, GuidanceService]),
  ],
  controllers: [GuidesController],
  providers: [GuidesService, GuidesRepository],
})
export class GuidesModule {}
