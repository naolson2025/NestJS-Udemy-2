import { Report } from 'src/reports/report.entity';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  admin: boolean;

  @Column()
  email: string;

  // Here @Exclude is preventing the password from being sent to the client
  @Column()
  password: string;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  // Here we have 3 examples of adding logic to an entity file
  // We can run a function AfterInsert that will log the id of the inserted user
  // it is important to create() an instance of an entity before save() because
  // otherwise we will lose this functionality
  @AfterInsert()
  logInsert() {
    console.log('Inserted User with this id', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated User with id', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('removed user with id', this.id);
  }
}
