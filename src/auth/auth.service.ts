import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { UserDataWithToken } from './interface/UserDataWithToken';
import * as argon from 'argon2'

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private jwt: JwtService,
        private config:ConfigService
    ){}

    async signup(createUserDto:CreateUserDto):Promise<UserDataWithToken>{
        
        try {
            const hash = await argon.hash(createUserDto.hash)

            const newUser = this.userRepository.create({ ...createUserDto, hash: hash })
            const newRegisteredUser = await this.userRepository.save(newUser)
            const token = await this.signToken(newRegisteredUser.id, newRegisteredUser.email);
           
            return {user:newRegisteredUser,token}
        
        } catch (error) {
            throw new BadRequestException({error})
        }

    
    }

    async signToken(userId: string, email: string):Promise<string>{
        const payload = { sub: userId, email }
        
        return this.jwt.signAsync(payload, {
            expiresIn: '60m', secret:this.config.get('JWT_SECRET')
        })
    }


}
