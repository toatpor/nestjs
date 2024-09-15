import { Posts } from './../post/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    //   text or string
    type: 'varchar',
    length: 96,
    nullable: false,
  })
  firstName: string;

  @Column({ type: 'varchar', length: 96, nullable: true })
  lastName: string;

  @Column({ type: 'varchar', length: 96, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 96, nullable: false, select: false })
  password: string;

  // User can write multiple post
  @OneToMany(() => Posts, (post) => post.author)
  posts: Posts[];
}
