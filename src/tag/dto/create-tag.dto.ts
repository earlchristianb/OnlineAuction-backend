import { IsString } from "class-validator";



export class CreateTagDTO{
    
    @IsString()
    label:string
}