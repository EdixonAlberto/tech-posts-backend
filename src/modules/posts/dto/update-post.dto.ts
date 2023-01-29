import { PartialType, ApiProperty } from '@nestjs/swagger'
import { IsEnum } from 'class-validator'

import { CreatePostDto } from './create-post.dto'
import { Status } from '@MODULES/posts/entities/post.entity'

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @ApiProperty()
  @IsEnum(Status)
  readonly status: Status
}
