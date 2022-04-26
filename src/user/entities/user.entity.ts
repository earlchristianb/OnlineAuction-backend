import { AuctionItem } from "src/auction-item/entities/auction-item.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinColumn, JoinTable, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
    
    @UpdateDateColumn()
    dateUpdated: Date;

    @DeleteDateColumn()
    dateDeleted: Date;
}

export enum Gender{
    Male = "Male",
    Female="Female"
}