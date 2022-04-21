import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user-login.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService:AuthService){}

    @Post('signup')
    signup(@Body() createUserDto:CreateUserDto) {
        return this.authService.signup(createUserDto)
    }

    @Post('login') 
    login(@Body() userLoginDto:UserLoginDto){
        return this.authService.login(userLoginDto);
        
    }
}
