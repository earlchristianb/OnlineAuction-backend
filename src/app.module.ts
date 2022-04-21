import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TagModule } from './tag/tag.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import {ConfigModule} from '@nestjs/config'
import { UserModule } from './user/user.module';
import { AuctionItemModule } from './auction-item/auction-item.module';
import { AuthModule } from './auth/auth.module';


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
      ssl: {
        requestCert: true,
        rejectUnauthorized: false,
      }
    }),
    UserModule,
    AuctionItemModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService], 
})
export class AppModule {}
