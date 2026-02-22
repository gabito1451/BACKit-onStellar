import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class Users {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  
  @Column({ type: 'tsvector', nullable: true })
  searchVector: string;
}
