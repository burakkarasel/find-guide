import { AbstractEntity } from "src/database/abstract.entity";
import { Guide } from "./guide.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class GuidanceService extends AbstractEntity<GuidanceService> {
  @ManyToOne(() => Guide, (guide: Guide) => guide.guidanceServices)
  guide: Guide;
  @Column()
  country: string;
  @Column()
  city: string;
  @Column({ name: "price_per_person" })
  pricePerPerson: number;
  @Column({ nullable: true })
  duration: number;
}
