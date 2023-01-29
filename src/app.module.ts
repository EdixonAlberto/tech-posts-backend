import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { OrmModule } from './common/database/orm.module'
import { AuthModule } from './modules/auth/auth.module'
import { UsersModule } from './modules/users/users.module'
import { PostsModule } from './modules/posts/posts.module'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), OrmModule, AuthModule, UsersModule, PostsModule]
})
export class AppModule {}
