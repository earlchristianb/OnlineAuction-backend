import { Module } from '@nestjs/common';
import { AuctionItemController } from './auction-item.controller';
import { AuctionItemService } from './auction-item.service';

@Module({
  controllers: [AuctionItemController],
  providers: [AuctionItemService]
})
export class AuctionItemModule {}
