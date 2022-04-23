import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuctionItem } from './dto/create-auction-item.dto';
import { UpdateAuctionItem } from './dto/update-auction-item';
import { AuctionItem } from './entities/auction-item.entity';

@Injectable()
export class AuctionItemService {
    constructor(
        @InjectRepository(AuctionItem)
        private itemRepository:Repository<AuctionItem>
    ) {
        
    }

    async addItem(ownerId:string,createAuctionItem:CreateAuctionItem):Promise<AuctionItem> {
       try {
            const newItem = this.itemRepository.create({ ...createAuctionItem, ownerId: ownerId })
        const savedItem = this.itemRepository.save(newItem);
        return savedItem;
       } catch (error) {
           return error
       }
       
    }

    async findMyItems(ownerId:string):Promise<AuctionItem[]> {
        const myItems = await this.itemRepository.find({ ownerId: ownerId });
        return myItems
    }

    async updateItem(ownerId:string,itemId:string, updateAuctionItem:UpdateAuctionItem):Promise<AuctionItem> {
        try {
            const preloadedItem = await this.itemRepository.preload({ itemId, ...updateAuctionItem });
            if (preloadedItem.ownerId !== ownerId)
            {
                throw new UnauthorizedException()   
            }
            const updatedItem = await this.itemRepository.save(preloadedItem);
            return updatedItem;

        } catch (error) {
            return error
        }
       
    }
}
