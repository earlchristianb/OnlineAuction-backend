import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { imageType } from 'src/cloudinary/enum';
import { Repository } from 'typeorm';
import { CreateAuctionItem } from './dto/create-auction-item.dto';
import { UpdateAuctionItem } from './dto/update-auction-item';
import { AuctionItem } from './entities/auction-item.entity';
import { ItemDeletedEvent } from './events/item-deleted.events';
import { ItemEvents } from './events/item-events.enum';

@Injectable()
export class AuctionItemService {
    constructor(
        @InjectRepository(AuctionItem)
        private itemRepository: Repository<AuctionItem>,
        private readonly cloudinaryService: CloudinaryService,
        private readonly eventEmitter: EventEmitter2
    ) {
        
    }

    async addItem(ownerId: string, createAuctionItem: CreateAuctionItem): Promise<AuctionItem> {
        try {
            const newItem = await this.saveItem(createAuctionItem, ownerId);
            const uploadedImageLink = await this.cloudinaryService.uploadImage(newItem.imageLink, newItem.itemId,imageType.ITEM)
            newItem.imageLink = uploadedImageLink;
            return await this.itemRepository.save(newItem);
       } catch (error) {
           return error
       }
       
    }

    async removeItem(itemId: string, userId:string) {
        const existingItem = await this.itemRepository.findOne(itemId);
        if (existingItem.ownerId !== userId)
            throw new UnauthorizedException()
        const removedItem = await this.itemRepository.delete(itemId);    
        if (removedItem)
            this.eventEmitter.emit(ItemEvents.ItemRemoved, new ItemDeletedEvent(itemId));
        return 'Succesfully removed';
    }

    @OnEvent(ItemEvents.ItemRemoved)
    async removeItemPicture(payload:ItemDeletedEvent) {
        const publicId = `Auction/items/${payload.id}`
        this.cloudinaryService.removeInCloudinary(publicId);
    }

    async findMyItems(ownerId:string):Promise<AuctionItem[]> {
        const myItems = await this.itemRepository.find({ ownerId: ownerId });
        return myItems;
    }

    async updateItem(ownerId: string, itemId: string, updateAuctionItem: UpdateAuctionItem): Promise<AuctionItem> {
        try {
            let uploadedImageLink: string;
            const preloadedItem = await this.itemRepository.preload({ itemId, ...updateAuctionItem });
            if (preloadedItem.ownerId !== ownerId)
            {
                throw new UnauthorizedException()   
            }
            if (updateAuctionItem.imageLink) {
                uploadedImageLink = await this.cloudinaryService.uploadImage(updateAuctionItem.imageLink, itemId,imageType.ITEM);
                preloadedItem.imageLink = uploadedImageLink;
            }
            const updatedItem = await this.itemRepository.save(preloadedItem);
            return updatedItem;

        } catch (error) {
            return error
        }
       
    }

    private async saveItem(createAuctionItem:CreateAuctionItem,ownerId:string):Promise<AuctionItem>{
        const newItem = this.itemRepository.create({ ...createAuctionItem, ownerId: ownerId })
        const savedItem = this.itemRepository.save(newItem);
        return savedItem
            
    }
           
            
}
