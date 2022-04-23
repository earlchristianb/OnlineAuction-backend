import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { userInfo } from "os";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private config: ConfigService,

        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:config.get('JWT_SECRET')
        })
    }

    async validate(payload: {
        sub: string;
        email: string;
    }) {

        const user = await this.userRepository.findOne(payload.sub)
        console.log(user.name);
        return user;
    }
}