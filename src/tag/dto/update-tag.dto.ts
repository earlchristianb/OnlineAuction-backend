import { CreateTagDTO } from "./create-tag.dto";
import {PartialType} from '@nestjs/swagger'

export class UpdateTagDTO extends PartialType(CreateTagDTO){

}