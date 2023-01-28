import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypegooseModule } from 'nestjs-typegoose'

import { OrmModule } from './common/database/orm.module'
import { UsersModule } from './modules/users/users.module'
import { PostsModule } from './modules/posts/posts.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypegooseModule.forFeature([UsersModule]),
    OrmModule,
    UsersModule,
    PostsModule
  ],
  providers: []
})
export class AppModule {}
