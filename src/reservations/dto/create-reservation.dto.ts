import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsUUID } from "class-validator";

export class CreateReservationDto {
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  startDate: Date;
  @IsUUID()
  @IsNotEmpty()
  guidanceServiceId: string;
}
