import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateGuidanceServiceDto {
  @IsString()
  @IsNotEmpty()
  country: string;
  @IsString()
  @IsNotEmpty()
  city: string;
  @IsNumber()
  @IsNotEmpty()
  pricePerPerson: number;
  @IsOptional()
  @IsNumber()
  duration: number;
}
