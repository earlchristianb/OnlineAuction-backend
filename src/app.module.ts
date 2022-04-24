import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TagModule } from './tag/tag.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import {ConfigModule} from '@nestjs/config'
import { UserModule } from './user/user.module';
import { AuctionItemModule } from './auction-item/auction-item.module';
import { AuthModule } from './auth/auth.module';
import { AuctionItem } from './auction-item/entities/auction-item.entity';
import { User } from './user/entities/user.entity';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CloudinaryProvider } from './cloudinary/cloudinary.provider';
@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal:true
    }),
    TagModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url:process.env.DB_CONNECTION_URL,
      synchronize: true,
      autoLoadEntities: true,
      entities:[AuctionItem,User],
      ssl: {
        requestCert:true,
        rejectUnauthorized: false,
      }
    }),
    UserModule,
    AuctionItemModule,
    AuthModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [AppService], 
})
export class AppModule {}
