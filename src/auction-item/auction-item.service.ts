import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { async } from 'rxjs';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { imageType } from 'src/cloudinary/enum';
import { Repository } from 'typeorm';
import { CreateAuctionItem } from './dto/create-auction-item.dto';
import { UpdateAuctionItem } from './dto/update-auction-item';
import { AuctionItem } from './entities/auction-item.entity';

@Injectable()
export class AuctionItemService {
    constructor(
        @InjectRepository(AuctionItem)
        private itemRepository: Repository<AuctionItem>,
        private readonly cloudinaryService:CloudinaryService
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

    async findMyItems(ownerId:string):Promise<AuctionItem[]> {
        const myItems = await this.itemRepository.find({ ownerId: ownerId });
        return myItems
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
