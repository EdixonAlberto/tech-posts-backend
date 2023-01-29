import { ApiProperty } from '@nestjs/swagger'
import { Matches, IsString, IsOptional } from 'class-validator'

export class CreatePostDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly image?: string

  @ApiProperty()
  @IsString()
  readonly message: string

  // TODO: Determinar el id del usuario por medio de la sesion
  @ApiProperty()
  @Matches(/^[a-z0-9]{24}$/)
  readonly author: string

  @ApiProperty()
  @IsString()
  readonly location: string
}
