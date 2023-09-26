import { Injectable } from "@nestjs/common";
import { GuidanceServiceRepository } from "./guidance-service.repository";
import { GuidanceService } from "./entity";

@Injectable()
export class GuidanceServiceService {
  constructor(
    private readonly guidanceServiceRepository: GuidanceServiceRepository,
  ) {}

  async findGuidanceServiceById(id: string): Promise<GuidanceService> {
    return this.guidanceServiceRepository.findOneBy({ id }, { guide: true });
  }
}
