import { Body, CacheInterceptor, ClassSerializerInterceptor, Controller, Get, Param, Patch, UseGuards, UseInterceptors } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { JwtGuard } from 'src/common/guard';
import { GetUser } from 'src/common/decorators';
import { User } from './entities/user.entity';


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
        
    }
    
    @UseInterceptors(ClassSerializerInterceptor)
    @Patch(':id')  
    updateUser(@Param('id') id:string , @Body() updateUserDto: UpdateUserDto) {
        return this.userService.updateUser(id,updateUserDto)
    }
    
    @UseInterceptors(ClassSerializerInterceptor,CacheInterceptor)
    @UseGuards(JwtGuard)
    @Get()
    findMe(@GetUser() user:User) {
        return this.userService.findMe(user.id);
    }

}
