/* eslint-disable prettier/prettier */
import { UserAddressProp } from '../dto/create-user.dto';
import { generateObjectId } from 'src/utils';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class UserEntity extends BaseEntity {
  constructor(partial?: Partial<UserEntity>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ unique: true, nullable: true })
  phoneNumber: string;

  @Column({ unique: true, nullable: true })
  instagram: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ type: 'json', nullable: true })
  address?: UserAddressProp;

  @Column('text', { array: true })
  company: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  lastUpdatedAt: Date;

  /**
   * This method will update the class properties with the values from the
   * given object.
   * @param {Partial<UserEntity>} partial : Partial object with the values to be updated
   */
  update(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
