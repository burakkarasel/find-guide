import { AbstractRepository } from "src/database/abstract.repository";
import { Guide } from "./entities";
import { Logger } from "@nestjs/common";
import { EntityManager, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

export class GuidesRepository extends AbstractRepository<Guide> {
  protected readonly logger = new Logger();
  constructor(
    @InjectRepository(Guide) guideRepository: Repository<Guide>,
    entityManager: EntityManager,
  ) {
    super(guideRepository, entityManager);
  }
}
