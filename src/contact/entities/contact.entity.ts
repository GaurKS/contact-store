import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { UserAddressProp } from '../dto/create-contact.dto';

@Entity()
export class Contact extends BaseEntity {
  constructor(partial?: Partial<Contact>) {
    super();
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  mobileNumber: string;

  @Column({ type: 'json', nullable: true })
  address?: UserAddressProp;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  instagram: string;

  @Column()
  companyName: string;
}
