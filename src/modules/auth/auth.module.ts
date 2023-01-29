import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'

import { UserModel } from '@MODULES/users/entities/user.entity'
import { JwtModule } from '@COMMON/jwt/jwt.module'
import { AuthService } from './services/auth.service'
import { AuthController } from './auth.controller'

@Module({
  imports: [TypegooseModule.forFeature([UserModel]), JwtModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
