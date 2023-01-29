import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common'
import { ApiTags, ApiResponse } from '@nestjs/swagger'

import { Auth } from '@COMMON/decorators/auth.decorator'
import { Role } from '@MODULES/users/entities/user.entity'
import { PostModel } from './entities/post.entity'
import { PostsService } from './services/posts.service'
import { CreatePostDto, UpdatePostDto } from './dto'
import { ObjectIdDto } from '@COMMON/dto'

@ApiTags('Posts')
@Controller('api/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @Auth(Role.Admin, Role.User)
  @ApiResponse({ type: PostModel, status: 201 })
  async create(@Req() { user }: IRequest, @Body() post: CreatePostDto): Promise<PostModel> {
    return this.postsService.create(post, user)
  }

  @Get()
  @Auth(Role.Admin, Role.User)
  @ApiResponse({ type: [PostModel], status: 200 })
  async findAll(@Req() { user }: IRequest): Promise<PostModel[]> {
    return this.postsService.findAll(user)
  }

  @Get(':id')
  @Auth(Role.Admin, Role.User)
  @ApiResponse({ type: PostModel, status: 200 })
  async findOne(@Req() { user }: IRequest, @Param() { id }: ObjectIdDto): Promise<PostModel> {
    return this.postsService.findOne(id, user)
  }

  @Patch(':id')
  @Auth(Role.Admin) // TODO: El usuario deberia actualizar sus posts ?
  @ApiResponse({ type: PostModel, status: 200 })
  async update(@Param() { id }: ObjectIdDto, @Body() postData: UpdatePostDto): Promise<PostModel> {
    return this.postsService.update(id, postData)
  }

  @Delete(':id')
  @Auth(Role.Admin)
  @ApiResponse({ type: PostModel, status: 200 })
  async remove(@Param() { id }: ObjectIdDto): Promise<PostModel> {
    return this.postsService.remove(id)
  }
}
