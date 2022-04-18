import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { create } from "domain";
import { Repository } from "typeorm";
import { CreateTagDTO } from "./dto/create-tag.dto";
import { UpdateTagDTO } from "./dto/update-tag.dto";
import { Tag } from "./entities/tag.entity";
@Injectable()
export class TagService{
    constructor(
        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>
    ) {
        
    }

    async findAll():Promise<Tag[]> {
        const allTags = await this.tagRepository.find();
        return allTags;
    }
    async findOne(id:number): Promise<Tag>{
        const tag = await this.tagRepository.findOne(id)
        if (!tag) {
            throw new NotFoundException()
        }
        return tag;
    }

    async create(createTagDto:CreateTagDTO):Promise<Tag>
    {
        try {
         const tag = this.tagRepository.create(createTagDto);
         return await this.tagRepository.save(tag);
        } catch (error) {
            throw new BadRequestException()
        }
       
    }

    async update(id:number,updateTagDto: UpdateTagDTO): Promise<Tag>{
        const tag = await this.tagRepository.preload({ id, ...updateTagDto });
        if (!tag) {
            throw new NotFoundException(`Tag ${id} not found`)
        }
        return  await this.tagRepository.save(tag)
    }

    async remove(id: number) {
        try {
        const tag = await this.tagRepository.findOne(id);
        return await this.tagRepository.softRemove(tag);
        } catch (error) {
            console.log(error)
        }
      
    }
}   