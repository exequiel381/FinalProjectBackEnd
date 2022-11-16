import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Body,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { AppResource } from 'src/app.roles';
import { PostService } from './post.service';
import { CreatePostDto, EditPostDto } from './dtos';
import { User, Auth } from 'src/common/decorators';
import { User as UserEntity } from 'src/user/entities';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { RenameImage } from 'src/images/images.helper';
import { ImagePost } from './entities/images-post.entity';


@ApiTags('Posts Routes')
@Controller('post')
export class PostController {

  constructor(
    private readonly postService: PostService,
    @InjectRolesBuilder()
    private readonly roleBuilder: RolesBuilder,
  ) {}

  //@Auth()
  @Get()
  async getMany() {
    const data = await this.postService.getMany();
    return { data };
  }

  @Get('/categories')
  async getManyCategories() {
    const data = await this.postService.getManyCategories();
    return { data };
  }

  @Auth()
  @Get('/postbyuser')
  async getPostByUser(@User() author: UserEntity) {
    const data = await this.postService.getPostByUser(author);
    return { data };
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number){
    const data = await this.postService.getById(id);
    return { data };
  }

  @Auth({
    resource: AppResource.POST,
    action: 'create',
    possession: 'own',
  })
  @Post()
  async createPost(@Body() dto: CreatePostDto, @User() author: UserEntity) {
    if(author !== null){
      const data = await this.postService.createOne(dto, author);
      return { message: 'Post created', data };
    }else return { message: 'No se encontro el usuario' };
  }

  @Auth({
    resource: AppResource.POST,
    action: 'create',
    possession: 'own',
  })
  @Post('newpostwithimages')
  @UseInterceptors(FilesInterceptor('files',5,{
    storage : diskStorage({
      destination : './upload',
      filename : RenameImage,
    })
  }))
  async createPostWithImages(@Body() CreatePostDto:  CreatePostDto,@UploadedFiles() files: Array<Express.Multer.File>,@User() author: UserEntity) {
    CreatePostDto.type = {id : CreatePostDto.typeNumber}
    if(author !== null){
    let images = files?.map((file)=>{
       let image = new ImagePost();
       image.name = file.filename;
       return image;
    })
    CreatePostDto["images"] = images;
    const data = await this.postService.createOne(CreatePostDto, author);
    return { message: 'Post created', data };
    }else return { message: 'No se encontro el usuario' };
  }


  @Auth({
    resource: AppResource.POST,
    action: 'update',
    possession: 'own',
  })
  @Put(':id')
  async editOne(
    @Param('id') id: number,
    @Body() dto: EditPostDto,
    @User() author: UserEntity,
  ) {
    let data;

    if (
      this.roleBuilder.can(author.roles).updateAny(AppResource.POST).granted
    ) {
      // Puede editar cualquier POST...
      data = await this.postService.editOne(id, dto);
    } else {
      // Puede editar solo los propios...
      data = await this.postService.editOne(id, dto, author);
    }

    return { message: 'Post edited', data };
  }

  @Auth({
    resource: AppResource.POST,
    action: 'delete',
    possession: 'own',
  })
  @Delete(':id')
  async deleteOne(@Param('id') id: number, @User() author: UserEntity) {
    let data;
    if (
      this.roleBuilder.can(author.roles).deleteAny(AppResource.POST).granted
    ) {
      data = await this.postService.deleteOne(id);
    } else {
      data = await this.postService.deleteOne(id, author);
    }
    return { message: 'Post deleted', data };
  }



  /*Ejemplos de subida de archivos 
   @Post('testUpload')//Funcionando para subir una imagen
   @UseInterceptors(FileInterceptor('file',{
    storage : diskStorage({
      destination : './upload',
      filename : RenameImage,
    })
   }))
   testUpload(@UploadedFile() file : Express.Multer.File){
    console.log(file);
   }
}*/
}
