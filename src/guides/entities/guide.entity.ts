import { AbstractEntity } from "src/database/abstract.entity";
import { User } from "src/users/entities";
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  UpdateDateColumn,
} from "typeorm";
import { GuidanceService } from "./guidance-service.entity";

@Entity()
export class Guide extends AbstractEntity<Guide> {
  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt: Date;
  @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
  updatedAt: Date;
  @OneToOne(() => User, { cascade: true })
  @JoinColumn()
  user: User;
  @OneToMany(
    () => GuidanceService,
    (guidanceService: GuidanceService) => guidanceService.guide,
    { cascade: true },
  )
  guidanceServices: GuidanceService[];
}
