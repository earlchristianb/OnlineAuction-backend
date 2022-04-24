import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { AuctionItemController } from './auction-item.controller';
import { AuctionItemService } from './auction-item.service';
import { AuctionItem } from './entities/auction-item.entity';

@Module({
  imports:[TypeOrmModule.forFeature([AuctionItem]),CloudinaryModule],
  controllers: [AuctionItemController],
  providers: [AuctionItemService]
})
export class AuctionItemModule {}
