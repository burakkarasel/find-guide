import { AbstractRepository } from "src/database/abstract.repository";
import { Guide } from "./entities";
import { Logger } from "@nestjs/common";
import {
  Between,
  EntityManager,
  FindOptionsOrder,
  In,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ListGuidesDto } from "./dto";

export class GuidesRepository extends AbstractRepository<Guide> {
  protected readonly logger = new Logger();
  constructor(
    @InjectRepository(Guide)
    private readonly guideRepository: Repository<Guide>,
    entityManager: EntityManager,
  ) {
    super(guideRepository, entityManager);
  }

  async listGuides(
    listDto?: ListGuidesDto,
    order?: FindOptionsOrder<Guide>,
  ): Promise<Guide[]> {
    return this.guideRepository.find({
      where: {
        guidanceServices: {
          country: listDto?.countries ? In(listDto?.countries) : undefined,
          city: listDto?.cities ? In(listDto?.cities) : undefined,
          pricePerPerson:
            listDto?.highestPrice && listDto?.lowestPrice
              ? Between(listDto.lowestPrice, listDto.highestPrice)
              : listDto?.highestPrice && !listDto?.lowestPrice
              ? LessThanOrEqual(listDto.highestPrice)
              : listDto?.lowestPrice && !listDto?.highestPrice
              ? MoreThanOrEqual(listDto.lowestPrice)
              : undefined,
          duration:
            listDto?.highestDuration && listDto?.lowestDuration
              ? Between(listDto.lowestDuration, listDto.highestDuration)
              : listDto?.highestDuration && !listDto?.lowestDuration
              ? LessThanOrEqual(listDto.highestDuration)
              : listDto?.lowestDuration && !listDto?.highestDuration
              ? MoreThanOrEqual(listDto.lowestDuration)
              : undefined,
        },
      },
      order,
      select: {
        user: {
          id: true,
          fullName: true,
        },
        guidanceServices: true,
        createdAt: true,
        updatedAt: true,
        id: true,
      },
      relations: { user: true, guidanceServices: true },
    });
  }

  async findGuideById(id: string): Promise<Guide> {
    const guide = await this.findOneBy(
      { id },
      { user: true, guidanceServices: true },
      {
        id: true,
        createdAt: true,
        updatedAt: true,
        guidanceServices: {
          city: true,
          country: true,
          pricePerPerson: true,
          duration: true,
        },
        user: {
          id: true,
          createdAt: true,
          updatedAt: true,
          isGuide: true,
          fullName: true,
        },
      },
    );
    return guide;
  }
}
