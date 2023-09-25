import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { ConfigModule } from "@nestjs/config";
import { GuidesModule } from './guides/guides.module';
import { ReservationsModule } from './reservations/reservations.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    GuidesModule,
    ReservationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
