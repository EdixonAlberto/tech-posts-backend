import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PostsModule } from './modules/posts/posts.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PostsModule, UsersModule],
  providers: []
})
export class AppModule {}
