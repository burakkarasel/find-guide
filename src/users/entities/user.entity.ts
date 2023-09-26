import { AbstractEntity } from "src/database/abstract.entity";
import { Guide } from "src/guides/entities/guide.entity";
import { Reservation } from "src/reservations/entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class User extends AbstractEntity<User> {
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt: Date;
  @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
  updatedAt: Date;
  @Column({ name: "is_guide", type: "boolean", default: false })
  isGuide: boolean;
  @Column({ name: "phone_number", nullable: true })
  phoneNumber: string;
  @Column({ name: "full_name" })
  fullName: string;
  @OneToOne(() => Guide, { nullable: true })
  @JoinColumn()
  guide: Guide;
  @OneToMany(
    () => Reservation,
    (reservation: Reservation) => reservation.user,
    { cascade: true },
  )
  reservations: Reservation[];
}
