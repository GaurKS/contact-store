/* eslint-disable prettier/prettier */
export class User {}
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

  /**
   * It is a unique Id of the user that will be exposed to the user or
   * the user can use it to make requests to the server.
   */
  @Column({
    unique: true,
    length: 16,
  })
  objectId: string;

  @Column({ name: 'phone_number', unique: true })
  phoneNumber: string;

  @Column({ nullable: false })
  name: string;

  @Column({ name: 'upi_vpa', default: null })
  upiVpa: string;

  @Column({
    name: 'image_url',
    default: null,
  })
  imageUrl: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'last_updated_at' })
  lastUpdatedAt: Date;

  /**
   * This method will assign a unique 16 char id to the user before saving
   * it in the database. All user object id's will have a prefix `oU`
   */
  @BeforeInsert()
  async assignObjectId() {
    this.objectId = generateObjectId('oU', 16);
  }

  /**
   * This method will update the class properties with the values from the
   * given object.
   * @param {Partial<UserEntity>} partial : Partial object with the values to be updated
   */
  update(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
