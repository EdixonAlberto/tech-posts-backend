import { ApiProperty } from '@nestjs/swagger'
import { Matches, IsString, IsArray, IsOptional, ArrayNotEmpty, IsEnum } from 'class-validator'

import { Status } from '@MODULES/posts/entities/post.entity'

export class CreatePostDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly image?: string

  @ApiProperty()
  @IsString()
  readonly message: string

  @ApiProperty({ required: false })
  @IsArray()
  @ArrayNotEmpty()
  @IsOptional()
  // @Matches(/^[a-z0-9]{24}$/, { each: true })
  readonly likes?: Array<string>

  @ApiProperty()
  @Matches(/^[a-z0-9]{24}$/)
  readonly author: string

  @ApiProperty()
  @IsString()
  readonly location: string

  @ApiProperty()
  @IsEnum(Status)
  readonly status: Status
}
