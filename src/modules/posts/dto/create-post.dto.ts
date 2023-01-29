import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsOptional, IsNotEmpty } from 'class-validator'

export class CreatePostDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly image?: string

  @ApiProperty()
  @IsString()
  readonly message: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly location: string
}
