
// import { Tag } from "src/tag/entities/tag.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { itemStatus } from "../dto/create-auction-item.dto";


@Entity()
export class AuctionItem{

    @PrimaryGeneratedColumn('uuid')
    itemId: string;

    @ManyToOne(
        () => User,
        user => user.items)
    owner: User;

    @Column()
    name: string;
    
    @Column()
    description: string;

    @Column()
    imageLink: string;

    @Column('json', { nullable: true })
    tags: string[];

    @Column({default:itemStatus.inStorage})
    status: itemStatus;

}