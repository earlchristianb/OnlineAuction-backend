import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {v2} from 'cloudinary';
import { imageType } from './enum';
@Injectable()
export class CloudinaryService {
    constructor( private configService:ConfigService){}
    async uploadImage(base64Image: string, id: string,type:imageType):Promise<string>{
        try {
        const uploadedResponse = await v2.uploader.upload(base64Image, {
        upload_preset: type==imageType.USER?this.configService.get('CLOUDINARY_USER_PRESET'):this.configService.get('CLOUDINARY_ITEM_PRESET'),
        public_id:id
        });
            return uploadedResponse.secure_url;
        } catch (error) {
             throw new BadRequestException()
        }
    }
}