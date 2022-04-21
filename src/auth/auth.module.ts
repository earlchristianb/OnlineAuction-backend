import { Module } from '@nestjs/common';
import { JwtModule} from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports:[TypeOrmModule.forFeature([User]),JwtModule.register(
      {
        signOptions: { expiresIn: '1h' },
        secret: process.env.JWT_SECRET
      })],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
