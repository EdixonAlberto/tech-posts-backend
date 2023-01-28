import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'

import { PostsService } from './services/posts.service'
import { PostsController } from './posts.controller'
import { PostModel } from '@MODULES/posts/entities/post.entity'

@Module({
  imports: [TypegooseModule.forFeature([PostModel])],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
