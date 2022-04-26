import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { imageType } from 'src/cloudinary/enum';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { Gender, User } from './entities/user.entity';


@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) 
        private readonly userRepository: Repository<User>,
        private readonly cloudinaryService:CloudinaryService
    ) { }
    
    
    
   async findAll():Promise<User[]>{
        try {
            const users = await this.userRepository.find();
            return users;
        } catch (error) {
            throw new BadRequestException()
        }
    }
    
    async findMe(id:string): Promise<User>{
        const myAccount = await this.userRepository.findOne(id, { relations: ['items'] });
        return myAccount
    }
    
    async updateUser(id:string,updateUserDto:UpdateUserDto){
        try {
             Logger.log('preloading..')
            const updatedUser = await this.userRepository.findOne(id);
            if (!updatedUser) throw new NotFoundException()
            if(updateUserDto.imageLink) {
                const uploadedImageLink = await this.cloudinaryService.uploadImage(updateUserDto.imageLink, id, imageType.USER)
                updatedUser.imageLink = uploadedImageLink;
            }
            //  if (updateUserDto.gender) {
            //      if (!Object.values(Gender).includes(updateUserDto.gender)) { throw new BadRequestException()}
            // }
            return await this.userRepository.save(updatedUser)
           
        } catch (error) {
           return 'error'
        }
    }


}
