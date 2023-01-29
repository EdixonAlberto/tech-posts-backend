import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'
import { JwtService } from '@nestjs/jwt'

import { UserModel } from '@MODULES/users/entities/user.entity'
import { AuthData } from '@MODULES/auth/entities/auth.entity'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: ReturnModelType<typeof UserModel>,
    private readonly jwtService: JwtService
  ) {}

  public async validateUser(username: string): Promise<UserModel> {
    const user = await this.userModel.findOne({ username })
    if (!user) throw new UnauthorizedException('The username is not registered', 'USERNAME_INVALID')
    return user
  }

  public generateAccessToken(user: UserModel): AuthData {
    const payload: IUserData = {
      id: user._id,
      username: user.username,
      role: user.role
    }

    return {
      accessToken: this.jwtService.sign(payload),
      user
    }
  }
}
