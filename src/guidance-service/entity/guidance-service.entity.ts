import { AbstractEntity } from "src/database/abstract.entity";
import { Guide } from "../../guides/entities/guide.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Reservation } from "src/reservations/entity";

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
  @OneToMany(
    () => Reservation,
    (reservation: Reservation) => reservation.guidanceService,
    { cascade: true },
  )
  reservations: Reservation[];
}
