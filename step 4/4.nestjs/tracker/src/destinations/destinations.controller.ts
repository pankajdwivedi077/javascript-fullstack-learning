import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DestinationsService } from './destinations.service';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { UpdateDestinationDto } from './dto/update-destination.dto';

@Controller('destinations')
@UseGuards(JwtAuthGuard)
export class DestinationsController {
  
   constructor(private readonly destinationService: DestinationsService){}

   @Post()
   create(@Request() req, @Body() createDestinationDto: CreateDestinationDto){
      return  this.destinationService.create(req.user.userId, createDestinationDto);
   }

    @Get()
    findAll(@Request() req){
        return this.destinationService.findAll(req.user.userId);
    }

    @Get(":id")
    findById(@Request() req, @Param("id") id: string){
        return this.destinationService.findOne(req.user.userId, +id);
    }

    @Patch(":id")
    updateById(@Request() req, @Param("id") id: string, @Body() updateDestinationDto:UpdateDestinationDto){
        return this.destinationService.updateDestination(req.user.userId, +id, updateDestinationDto);
    }

    @Delete(":id")
    deleteById(@Request() req, @Param("id") id: string){
        return this.destinationService.removeDestination(req.user.userId, +id);
    }
}
