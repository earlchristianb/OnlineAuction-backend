import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity()

export class Tag{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Index({unique:true})
    label: string; 


    @DeleteDateColumn()
    deletionDate:Date
    
        
        
    @UpdateDateColumn()
    updatedDate:Date
        
        
    @CreateDateColumn()
    creationDate:Date
        
   
        
    
}
