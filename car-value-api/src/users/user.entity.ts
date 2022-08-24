import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

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
