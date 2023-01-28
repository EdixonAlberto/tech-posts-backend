import { ApiProperty } from '@nestjs/swagger'
import { IsString, MinLength, MaxLength, IsEnum, IsOptional, IsNotEmpty } from 'class-validator'

import { Role } from '@MODULES/users/entities/user.entity'

export class CreateUserDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly avatar?: string

  @ApiProperty()
  @IsString()
  @MinLength(5)
  readonly username: string

  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  readonly name: string

  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  readonly surname: string

  @ApiProperty()
  @IsEnum(Role)
  readonly role: Role
}
