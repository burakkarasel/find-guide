import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { ConfigModule } from "@nestjs/config";
import { GuidesModule } from './guides/guides.module';
import { ReservationsModule } from './reservations/reservations.module';
import { GuidanceServiceModule } from './guidance-service/guidance-service.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    GuidesModule,
    ReservationsModule,
    GuidanceServiceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
