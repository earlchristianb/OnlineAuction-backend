import { BadRequestException, ConflictException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { Gender, User } from './entities/user.entity';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) 
        private readonly userRepository: Repository<User>
    ) { }
    
    
    
   async findAll():Promise<User[]>{
        try {
            const users = await this.userRepository.find();
            return users;
        } catch (error) {
            throw new BadRequestException()
        }
   }
    
    async updateUser(id:string,updateUserDto:UpdateUserDto): Promise<User>{
        try {
            const updatedUser = await this.userRepository.preload({ id, ...updateUserDto })
            if(!updatedUser) throw new NotFoundException()
            if (!Object.values(Gender).includes(updatedUser.gender)) {
               throw new BadRequestException()
            }
            return await this.userRepository.save(updatedUser)
           
        } catch (error) {
            throw new BadRequestException()
        }
    }

}
