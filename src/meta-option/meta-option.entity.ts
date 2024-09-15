import { Posts } from './../post/post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class MetaOption {
  @PrimaryGeneratedColumn()
  id: number;
  // pg provide json type for saving object to database
  // but mysql need to serialize json first, json.string before save
  @Column({
    type: 'json',
    nullable: false,
  })
  metaValue: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  // bi-directional relationship
  // return entity,second argument is the reference to meta-option on post inverse
  // of relationship connect meta-options by foreign key
  // since we set onDelete to cascade to be true, the meta options would automatically removed
  // along with post
  @OneToOne(() => Posts, (post) => post.metaOptions, {
    //  when post relation is deleted what should you do
    //  delete
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  // join column responsible for creating a column inside your entity table
  // insert foreign key for that table
  @JoinColumn()
  post: Posts;
}
