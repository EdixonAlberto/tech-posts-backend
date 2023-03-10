import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'

import { UserModel } from '@MODULES/users/entities/user.entity'
import { JwtModule } from '@COMMON/jwt/jwt.module'
import { UsersService } from './services/users.service'
import { UsersController } from './users.controller'

@Module({
  imports: [TypegooseModule.forFeature([UserModel]), JwtModule],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
