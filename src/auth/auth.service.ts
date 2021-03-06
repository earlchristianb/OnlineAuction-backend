import { BadRequestException, Injectable, UnauthorizedException,ForbiddenException, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { UserDataWithToken } from './interface/UserDataWithToken';
import * as argon from 'argon2'
import { UserLoginDto } from './dto/user-login.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { imageType } from 'src/cloudinary/enum';
@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private jwt: JwtService,
        private config: ConfigService,
        private cloudinaryService:CloudinaryService    
    ){}

    async signup(createUserDto:CreateUserDto):Promise<UserDataWithToken>{
        try {
            const existingUser = await this.userRepository.findOne({ email: createUserDto.email })
            if(existingUser)throw new ForbiddenException({status:HttpStatus.FORBIDDEN,error:"Email is already taken"})
            const hash = await argon.hash(createUserDto.hash)
            const newUser = this.userRepository.create({ ...createUserDto, hash: hash });
            const newRegisteredUser = await this.userRepository.save(newUser)
            const uploadedImageLink = await this.cloudinaryService.uploadImage(newRegisteredUser.imageLink, newRegisteredUser.id,imageType.USER)
            newRegisteredUser.imageLink = uploadedImageLink;
            const newRegisteredUserWithUpdatedImageLink = await this.userRepository.save(newRegisteredUser);
            const token = await this.signToken(newRegisteredUserWithUpdatedImageLink.id, newRegisteredUserWithUpdatedImageLink.email);
            return {user:newRegisteredUserWithUpdatedImageLink,token}
        } catch (error) {
            return error;
        }
            
    }


    async login(userLoginDto:UserLoginDto):Promise<UserDataWithToken> {
            const user = await this.userRepository.findOne({ email: userLoginDto.email });
            if (!user) {
                throw new NotFoundException({ status: HttpStatus.UNAUTHORIZED, error: 'Email not found'})
            }
            const pwMatches = await argon.verify(user.hash, userLoginDto.hash);
            if (!pwMatches) {
                throw new UnauthorizedException({ status: HttpStatus.UNAUTHORIZED, error: 'Wrong Credentials'})
            }
        const token = await this.signToken(user.id, user.email);
            console.log(user.hello);
            return { user, token };
    }

    signToken(userId: string, email: string):Promise<string>{
        const payload = { sub: userId, email }
        
        return this.jwt.signAsync(payload, {
            expiresIn: '60m', secret:this.config.get('JWT_SECRET')
        })
    }



}
