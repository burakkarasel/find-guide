import { AbstractRepository } from "src/database/abstract.repository";
import { Guide } from "./entities";
import { Logger } from "@nestjs/common";
import { EntityManager, FindOptionsOrder, In, Repository } from "typeorm";
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
      },
      relations: { user: true, guidanceServices: true },
    });
  }
}
