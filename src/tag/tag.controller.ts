import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ParseIntPipe } from "src/common/pipes/parse-int.pipe";
import { CreateTagDTO } from "./dto/create-tag.dto";
import { UpdateTagDTO } from "./dto/update-tag.dto";
import { TagService } from "./tag.service";

@Controller('tags')
export class TagController{
    constructor(private readonly tagService: TagService ) {}

    @Post()
        create(@Body() createTagDto: CreateTagDTO) {
        return this.tagService.create(createTagDto)
    }

    @Get()
        findAll() {
        return this.tagService.findAll();
    }

    @Get(':id')
        findOne(@Param('id', ParseIntPipe) id:number) {
        return this.tagService.findOne(id)
    }

    @Patch(':id')
        update(@Param('id',ParseIntPipe) id:number, @Body() updateTagDTO:UpdateTagDTO) {
        return this.tagService.update(id, updateTagDTO);
        }
        

    @Delete(':id')
        remove(@Param('id', ParseIntPipe)id:number) {
        return this.tagService.remove(id);
    }
}