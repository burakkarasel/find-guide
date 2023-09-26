import { Module } from "@nestjs/common";
import { GuidesController } from "./guides.controller";
import { GuidesService } from "./guides.service";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "src/database/database.module";
import { GuidesRepository } from "./guides.repository";
import { Guide } from "./entities";

@Module({
  imports: [ConfigModule, DatabaseModule, DatabaseModule.forFeature([Guide])],
  controllers: [GuidesController],
  providers: [GuidesService, GuidesRepository],
  exports: [GuidesService],
})
export class GuidesModule {}
