import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'

import { UsersService } from './services/users.service'
import { UsersController } from './users.controller'
import { UserModel } from '@MODULES/users/entities/user.entity'

@Module({
  imports: [TypegooseModule.forFeature([UserModel])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
