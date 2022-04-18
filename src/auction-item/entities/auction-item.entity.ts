
// import { Tag } from "src/tag/entities/tag.entity";
// import { User } from "src/user/entities/user.entity";
// import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


// @Entity()
// export class AuctionItem{

//     @PrimaryGeneratedColumn('uuid')
//     id: string;

//     @Column()
//     @ManyToOne(
//         () => User,
//         user => user.items)
//     owner: User;

//     @Column()
//     name: string;
    
//     @Column()
//     description: string;

//     @Column()
//     imageLink: string;

//     @Column()
//     tags: Tag[];

// }