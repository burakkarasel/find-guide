import { AbstractRepository } from "src/database/abstract.repository";
import { GuidanceService } from "./entity/guidance-service.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class GuidanceServiceRepository extends AbstractRepository<GuidanceService> {
  protected logger = new Logger(GuidanceServiceRepository.name);
  constructor(
    @InjectRepository(GuidanceService) repository: Repository<GuidanceService>,
    entityManager: EntityManager,
  ) {
    super(repository, entityManager);
  }
}
