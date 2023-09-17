import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { ListGuidesDto } from "../dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class ListGuidePipe implements PipeTransform {
  async transform(dto: ListGuidesDto, { metatype }: ArgumentMetadata) {
    if (!metatype) {
      return dto;
    }
    return plainToInstance(metatype, dto);
  }
}
