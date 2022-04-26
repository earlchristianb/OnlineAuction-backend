import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheConfigService } from 'src/cache/cache-config.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { AuctionItemController } from './auction-item.controller';
import { AuctionItemService } from './auction-item.service';
import { AuctionItem } from './entities/auction-item.entity';

@Module({
  imports:[TypeOrmModule.forFeature([AuctionItem]),CloudinaryModule,CacheModule.registerAsync({useClass:CacheConfigService})],
  controllers: [AuctionItemController],
  providers: [AuctionItemService,{provide:APP_INTERCEPTOR, useClass:CacheInterceptor}]
})
export class AuctionItemModule {}
