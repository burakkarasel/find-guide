import { IsNumber, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class ListGuidesDto {
  @IsOptional()
  @IsString({ each: true })
  cities?: string[];
  @IsOptional()
  @IsString({ each: true })
  countries?: string[];
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  lowestPrice?: number;
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  highestPrice?: number;
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  lowestDuration?: number;
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  highestDuration?: number;
}
