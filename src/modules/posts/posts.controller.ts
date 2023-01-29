import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common'

import { Auth } from '@COMMON/decorators/auth.decorator'
import { Role } from '@MODULES/users/entities/user.entity'
import { PostsService } from './services/posts.service'
import { CreatePostDto, UpdatePostDto } from './dto'
import { ObjectIdDto } from '@COMMON/dto'

@Controller('api/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @Auth(Role.Admin, Role.User)
  async create(@Body() post: CreatePostDto) {
    return this.postsService.create(post)
  }

  @Get()
  @Auth(Role.Admin, Role.User)
  async findAll(@Req() { user }: IRequest) {
    return this.postsService.findAll()
  }

  @Get(':id')
  @Auth(Role.Admin, Role.User)
  async findOne(@Req() { user }: IRequest, @Param() { id }: ObjectIdDto) {
    return this.postsService.findOne(id)
  }

  @Patch(':id')
  @Auth(Role.Admin, Role.User) // TODO: El usuario deberia actualizar sus posts ?
  async update(@Req() { user }: IRequest, @Param() { id }: ObjectIdDto, @Body() postData: UpdatePostDto) {
    return this.postsService.update(id, postData)
  }

  @Delete(':id')
  @Auth(Role.Admin)
  async remove(@Param() { id }: ObjectIdDto) {
    return this.postsService.remove(id)
  }
}
