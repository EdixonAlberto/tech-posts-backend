import { UserModel } from '@MODULES/users/entities/user.entity'
import { ApiProperty } from '@nestjs/swagger'

export class AuthData {
  @ApiProperty()
  accessToken: string

  @ApiProperty({ type: UserModel })
  user: UserModel
}
