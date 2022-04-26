import { AuctionItem } from "src/auction-item/entities/auction-item.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinColumn, JoinTable, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import {Exclude, Expose} from 'class-transformer'
@Entity()
export class User{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @Index({unique:true})
    name: string;

    @Column({nullable:true})
    imageLink?: string;
    
    @Column()
    address: string;
    
    @Column()
    email: string;
    
    @Exclude()
    @Column()
    hash: string;

    @Column('date')
    dob: Date;

    @Column()
    gender: Gender
    
    @OneToMany(() => AuctionItem, (auctionItem) => auctionItem.owner)
    items: AuctionItem[];

    @CreateDateColumn()
    dateCreated:Date;
    
    @Exclude()
    @UpdateDateColumn()
    dateUpdated: Date;

    @Exclude()
    @DeleteDateColumn()
    dateDeleted: Date;

    @Expose()
    get hello(): string{
        return `I am ${this.name} is a ${this.gender}`
    }
}

export enum Gender{
    Male = "Male",
    Female="Female"
}