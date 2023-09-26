import { AbstractEntity } from "src/database/abstract.entity";
import { Guide } from "src/guides/entities";
import { User } from "src/users/entities";
import { GuidanceService } from "src/guidance-service/entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Reservation extends AbstractEntity<Reservation> {
  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt: Date;
  @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
  updatedAt: Date;
  @Column({ name: "start_date", type: "timestamptz" })
  startDate: Date;
  @ManyToOne(() => GuidanceService)
  guidanceService: GuidanceService;
  @ManyToOne(() => User)
  user: User;
  @ManyToOne(() => Guide)
  guide: Guide;
  @Column()
  approved: boolean;
}
