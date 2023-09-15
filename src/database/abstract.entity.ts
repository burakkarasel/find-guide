import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AbstractEntity<T> {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  constructor(partial: Partial<T>) {
    Object.assign(this, partial);
  }
}
