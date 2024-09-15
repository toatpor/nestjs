import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostTypes, Status } from './enums/postType.enum';
import { addHours, formatISO } from 'date-fns';
import { MetaOption } from './../meta-option/meta-option.entity';
import { User } from './../users/user.entity';
import { Tags } from './../tags/tags.entity';

@Entity()
export class Posts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, length: 512 })
  title: string;

  @Column({
    type: 'enum',
    enum: PostTypes,
    nullable: false,
    default: PostTypes.post,
  })
  postType: PostTypes;

  @Column({ type: 'varchar', nullable: false, length: 256, unique: true })
  slug: string;

  @Column({
    type: 'enum',
    enum: Status,
    nullable: false,
    default: Status.draft,
  })
  status: Status;

  // type text allow you add a large amount of text to particular column
  @Column({ type: 'text', nullable: true })
  content?: string;

  @Column({ type: 'text', nullable: true })
  schema?: string;

  @Column({ type: 'varchar', nullable: true, length: 1024 })
  featuredImageUrl?: string;

  @Column({
    type: 'timestamp',
    nullable: true,
    default: formatISO(addHours(new Date(), 7)),
  })
  publishOn?: Date;

  // need to define join table, must put in entity that owner of relationship
  // we want to fetch post along with tags
  // owner side of relationship cascade for deletion would work automatically only unidirectional many to many relationship
  @ManyToMany(() => Tags, (tag) => tag.post)
  @JoinTable()
  tags?: Tags[];

  // created relationship one to one with meta- option entity
  @OneToOne(() => MetaOption, (metaOption) => metaOption.post, {
    // this will help to cascade insert remove update to child entity
    cascade: true,
    // fetch related entity not good much some time need to avoid
    eager: true,
  })
  // using entity type  instead for relation table
  metaOptions?: MetaOption;

  // return entity that we want to set the relationship with / which property inverse relationship
  // Each post own by one user
  // join-column always ly on many to one
  @ManyToOne(() => User, (user) => user.posts)
  author: User;
}
