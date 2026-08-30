import { BadRequestException, Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFileDto } from './dto/upload.file.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User, UserRole } from 'src/auth/entities/user.entity';
import { Roles } from 'src/auth/decorators/role.decorators';
import { RolesGuard } from 'src/auth/guards/role.guard';

@Controller('file-upload')
export class FileUploadController {

    constructor(private readonly fileUploadService: FileUploadService){}

    @Post()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor("file"))
    async uploadFile(@UploadedFile()file: any, @Body()uploadFileDto:UploadFileDto, @CurrentUser()user: User):Promise<any>{
      if(!file){
        throw new BadRequestException("file is required")
      }
      return this.fileUploadService.uploadFile(file,uploadFileDto.description,user)
    }

    @Get()
    async findAll(){
        return this.fileUploadService.findAll()
    }

    @Delete()
    @Roles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async remove(@Param("id", ParseUUIDPipe)id: string){
        await this.fileUploadService.remove(id)
        return {
            message: "file deleted succefully"
        }
    }

}
