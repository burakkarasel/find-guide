import { AbstractRepository } from "src/database/abstract.repository";
import { Reservation } from "./entity";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class ReservationsRepository extends AbstractRepository<Reservation> {
  protected logger = new Logger(ReservationsRepository.name);
  constructor(
    @InjectRepository(Reservation) repository: Repository<Reservation>,
    entityManager: EntityManager,
  ) {
    super(repository, entityManager);
  }
}
