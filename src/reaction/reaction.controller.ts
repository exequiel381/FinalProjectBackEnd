import {
    Controller,
    Get,
    Param,
    Post,
    Put,
    Delete,
    Body,
    ParseIntPipe,
  } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('reaction')
export class ReactionController {

  @ApiTags('Reactions Routes')  
  @Get()
  async getGretting() {
    return  "Reaction Controller" ;
  }

}
