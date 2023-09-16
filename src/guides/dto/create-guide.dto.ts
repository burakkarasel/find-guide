import { IsOptional, ValidateNested } from "class-validator";
import { CreateGuidanceServiceDto } from "./create-guidance-service.dto";

export class CreateGuideDto {
  @IsOptional()
  @ValidateNested()
  createGuidanceServiceDtos: CreateGuidanceServiceDto[];
}
