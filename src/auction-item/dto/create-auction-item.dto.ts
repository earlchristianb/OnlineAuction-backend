import { IsArray, IsEnum, IsObject, IsOptional, IsString } from "class-validator";
// import { Tag } from "src/tag/entities/tag.entity";
// import { User } from "src/user/entities/user.entity";


export enum itemStatus{
    inStorage = "Storage",
    inAuction = "Auction",
}

export class CreateAuctionItem{

    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    imageLink: string;

    @IsArray()
    @IsOptional()
    tags?: string[];

    @IsEnum(itemStatus)
    status: itemStatus;
}
