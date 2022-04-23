import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/common/decorators';
import { JwtGuard } from 'src/common/guard';
import { User } from 'src/user/entities/user.entity';
import { AuctionItemService } from './auction-item.service';
import { CreateAuctionItem } from './dto/create-auction-item.dto';
import { UpdateAuctionItem } from './dto/update-auction-item';
import { AuctionItem } from './entities/auction-item.entity';

@Controller('item')
export class AuctionItemController {
    constructor(
        private readonly itemService: AuctionItemService
    ){}

    @UseGuards(JwtGuard)
    @Post()
    addItem(@GetUser() user:User, @Body() createAuctionItem:CreateAuctionItem) {
        return this.itemService.addItem(user.id, createAuctionItem);
    }

    @UseGuards(JwtGuard)
    @Get()
    async findMyItems(@GetUser() user:User):Promise<AuctionItem[]> {
       return this.itemService.findMyItems(user.id)
    }

    @UseGuards(JwtGuard)
    @Post(':id')
    updateItem(@GetUser() user:User, @Body() updateAuctionItem:UpdateAuctionItem,@Param('id') itemId:string) {
        return this.itemService.updateItem(user.id, itemId, updateAuctionItem);
    }

}
