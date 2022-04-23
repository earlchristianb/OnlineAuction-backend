import { Module } from '@nestjs/common';
import { JwtModule} from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuctionItem } from 'src/auction-item/entities/auction-item.entity';
import { JwtStrategy } from 'src/common/strategy/jwt.strategy';
import { User } from 'src/user/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports:[TypeOrmModule.forFeature([User,AuctionItem]),JwtModule.register(
     {})],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy]
})
export class AuthModule {}
