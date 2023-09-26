import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { GuidesRepository } from "./guides.repository";
import { User } from "src/users/entities";
import { CreateGuidanceServiceDto, ListGuidesDto } from "./dto";
import { Guide } from "./entities";
import { GuidanceService } from "src/guidance-service/entity";

@Injectable()
export class GuidesService {
  private readonly logger = new Logger();
  constructor(private readonly guidesRepository: GuidesRepository) {}

  async create(
    user: User,
    guidanceServiceDtos: CreateGuidanceServiceDto[],
  ): Promise<Guide> {
    if (user.isGuide) {
      throw new BadRequestException("User is already a guide");
    }
    user.isGuide = true;
    const guidances = guidanceServiceDtos.map(
      (item) => new GuidanceService({ ...item }),
    );
    const toCreate = new Guide({ user, guidanceServices: guidances });
    return this.guidesRepository.insert(toCreate);
  }

  async listGuides(listDto: ListGuidesDto): Promise<Guide[]> {
    return this.guidesRepository.listGuides(listDto);
  }

  async findGuideById(id: string): Promise<Guide> {
    return this.guidesRepository.findGuideById(id);
  }
}
