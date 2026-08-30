import { Inject, Injectable } from "@nestjs/common";
import { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";
import * as streamfier from "streamifier"
import { Express } from "express";

@Injectable()
export class CloudinaryService{

    constructor(@Inject("CLOUDINARY") private readonly cloudinary: any){}

    uploadFile(file: any):Promise<UploadApiResponse>{
        return new Promise<UploadApiResponse>((resolve,reject)=>{
            const uploadStream = this.cloudinary.uploader.upload_stream({
                folder: "nestjs",
                resource_type: "auto"
            },
        (error: UploadApiErrorResponse, result:UploadApiResponse)=> {
            if(error) reject(error);
            resolve(result)
        })
        // convert the file buffer to a readable stream and pipe to the upload stream
        streamfier.createReadStream(file.buffer).pipe(uploadStream)
        })
    }

    async deleteFile(publicId: string): Promise<any>{
        return this.cloudinary.uploader.destory(publicId);
    }

}