import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {v2} from 'cloudinary';
@Injectable()
export class CloudinaryService {
    constructor( private configService:ConfigService){}
    async uploadItemImage(base64Image: string, id: string):Promise<string>{
        try {
        const uploadedResponse = await v2.uploader.upload(base64Image, {
        upload_preset: this.configService.get('COUDINARY_ITEM_PRESET'),
        public_id:id
        });
            return uploadedResponse.secure_url;
        } catch (error) {
             throw new BadRequestException()
        }
    }
}