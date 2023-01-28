import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'

import { PostsService } from './services/posts.service'
import { CreatePostDto, UpdatePostDto } from './dto'
import { ObjectIdDto } from '@COMMON/dto'

@Controller('api/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(@Body() post: CreatePostDto) {
    return this.postsService.create(post)
  }

  @Get()
  async findAll() {
    return this.postsService.findAll()
  }

  @Get(':id')
  async findOne(@Param() { id }: ObjectIdDto) {
    return this.postsService.findOne(id)
  }

  @Patch(':id')
  async update(@Param() { id }: ObjectIdDto, @Body() postData: UpdatePostDto) {
    return this.postsService.update(id, postData)
  }

  @Delete(':id')
  async remove(@Param() { id }: ObjectIdDto) {
    return this.postsService.remove(id)
  }
}
