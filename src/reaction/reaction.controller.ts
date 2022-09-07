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
import { InjectRolesBuilder } from 'nest-access-control';
import { AppResource } from 'src/app.roles';
import { Auth, User } from 'src/common/decorators';
import { User as UserEntity } from 'src/user/entities';
import { CreateReactionDto } from './dtos/create-reaction.dto';
import { GetReactionDto } from './dtos/get-reaction.dto';
import { ReactionService } from './reaction.service';

@ApiTags('Reactions Routes')  
@Controller('reaction')
export class ReactionController {
  constructor(
    private readonly reactionService: ReactionService,
  ) {}
  
  @Get()
  async getGretting() {
    return  "Hello I am Reaction Controller" ;
  }

  @Auth()
  @Post()
  async postReaction(@Body() dto: CreateReactionDto, @User() author: UserEntity){
    const data = await this.reactionService.createOne(dto, author);
    return { message: 'Reaction created', data };
  }

  @Get(':PostId')
  async getReactionsByPost(@Param('PostId', ParseIntPipe) id: number) {
    const data = await this.reactionService.getReactionsByPostId(id);
    return { data };
  }

}
