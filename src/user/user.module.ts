import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheConfigService } from 'src/cache/cache-config.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports:[TypeOrmModule.forFeature([User]),CloudinaryModule,CacheModule.registerAsync({useClass:CacheConfigService})],
  controllers: [UserController],
  providers: [UserService, {provide:APP_INTERCEPTOR, useClass:CacheInterceptor}],
  exports:[UserService]
})
export class UserModule {}
