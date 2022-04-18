import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserService } from './user.service';


@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){}

    @Post('new')
         signUp(@Body() createUserDto:CreateUserDto) {
        return this.userService.signUp(createUserDto)
         }

    @Patch(':id')  
    updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.updateUser(id,updateUserDto)
        }
        
    

    @Get()
        findAll() {
        return this.userService.findAll();
         }

    @Post('login')
    login(userLoginDto:UserLoginDto){
        return this.userService.logIn(userLoginDto)
    }


}
