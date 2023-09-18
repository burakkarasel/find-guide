import { Logger, NotFoundException } from "@nestjs/common";
import { AbstractEntity } from "./abstract.entity";
import {
  EntityManager,
  FindOptionsRelations,
  FindOptionsSelect,
  FindOptionsWhere,
  Repository,
} from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export abstract class AbstractRepository<T extends AbstractEntity<T>> {
  protected abstract logger: Logger;
  constructor(
    private readonly entityRepository: Repository<T>,
    private readonly entityManager: EntityManager,
  ) {}

  async insert(entity: T): Promise<T> {
    return this.entityManager.save(entity);
  }

  async findOneBy(
    where: FindOptionsWhere<T>,
    relations?: FindOptionsRelations<T>,
    select?: FindOptionsSelect<T>,
  ): Promise<T> {
    const entity = await this.entityRepository.findOne({
      where,
      relations,
      select,
    });
    if (!entity) {
      this.logger.warn(
        `Entity not found while fetching with given filters: ${where}`,
      );
      throw new NotFoundException("Entity not found!");
    }
    return entity;
  }

  async listBy(
    where: FindOptionsWhere<T>,
    relations?: FindOptionsRelations<T>,
    select?: FindOptionsSelect<T>,
  ): Promise<T[]> {
    return this.entityRepository.find({ where, relations, select });
  }

  async findOneAndUpdate(
    where: FindOptionsWhere<T>,
    toUpdate: QueryDeepPartialEntity<T>,
  ): Promise<T> {
    const updateResult = await this.entityRepository.update(where, toUpdate);
    if (!updateResult.affected) {
      this.logger.warn(
        `Entity not found while updating with given filters: ${where}`,
      );
      throw new NotFoundException("Entity not found!");
    }
    return this.findOneBy(where);
  }

  async findOneAndDelete(where: FindOptionsWhere<T>): Promise<void> {
    const deleteResult = await this.entityRepository.delete(where);
    if (!deleteResult.affected) {
      this.logger.warn(
        `Entity not found while deleting with given filters: ${where}`,
      );
      throw new NotFoundException("Entity not found!");
    }
    return;
  }
}
