import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  walletAddress: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ unique: true })
  referralCode: string;

  @ManyToOne(() => Users, (user) => user.referrals, { nullable: true })
  @JoinColumn({ name: 'referred_by_id' })
  referredBy?: Users;

  @OneToMany(() => Users, (user) => user.referredBy)
  referrals: Users[];

  @ManyToMany(() => Users, (user) => user.followers)
  @JoinTable({
    name: 'follows',
    joinColumn: { name: 'followerId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'followingId', referencedColumnName: 'id' },
  })
  following: Users[];

  @ManyToMany(() => Users, (user) => user.following)
  followers: Users[];

  @Column({ type: 'tsvector', nullable: true })
  searchVector: string;
}
