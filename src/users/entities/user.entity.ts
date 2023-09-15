import { AbstractEntity } from "src/database/abstract.entity";
import { Column, CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";

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
}