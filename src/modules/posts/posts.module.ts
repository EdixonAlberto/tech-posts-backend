import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'

import { PostModel } from '@MODULES/posts/entities/post.entity'
import { JwtModule } from '@COMMON/jwt/jwt.module'
import { PostsService } from './services/posts.service'
import { PostsController } from './posts.controller'

@Module({
  imports: [TypegooseModule.forFeature([PostModel]), JwtModule],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
