import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { v2 as cloudinary } from "cloudinary";
import * as fs from "fs";

@Injectable()
export class FileUploadService {

    constructor(private readonly prisma: PrismaService){
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        })
    }

    async uploadFile(file: Express.Multer.File){

         try{

             const uploadResult = await this.uploadToCloudinary(file.path);

             const newlySavedFile = await this.prisma.file.create({
                data: {
                    filename: file.originalname,
                    publicId: uploadResult.public_id,
                    url: uploadResult.secure_url
                }
             })

             fs.unlinkSync(file.path)

             return newlySavedFile;

         }catch(error){
            // removing in case of any error -> this file from local folder
            if(file.path && fs.existsSync(file.path)){
                fs.unlinkSync(file.path)
            }
            throw new InternalServerErrorException("file upload failed")
         }
    }

    async deleteFile(fileId: string){
        try{
          const file = await this.prisma.file.findUnique({
            where: {
                id: fileId
            }
          })
          if(!file){
            throw new Error("file not found")
          }
          await cloudinary.uploader.destroy(file.publicId)
          await this.prisma.file.delete({
            where: {
                id: fileId
            }
          })
          return {
            message: "File deleted"
          }
        }catch(error){
            
            throw new InternalServerErrorException("file upload failed")
        }
    }

    private uploadToCloudinary(filePath: string): Promise<any>{
        return new Promise((resolve, reject)=> {
            cloudinary.uploader.upload(filePath, (error, result)=> {
                if(error) {
                    return reject(error);
                }
                resolve(result);
            })
        })
    }

}
