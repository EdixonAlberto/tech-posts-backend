import { ApiProperty } from '@nestjs/swagger'
import { IsArray, ArrayNotEmpty, IsOptional, Matches } from 'class-validator'

// TODO: Crear endpoint independiente para actualizar los likes
export class UpdateLikeDto {
  @ApiProperty({
    required: false,
    format: '/^[a-z0-9]{24}$/',
    example: '62d81ead14b1f43bf21f4711'
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsOptional()
  @Matches(/^[a-z0-9]{24}$/, { each: true })
  readonly likes?: Array<string>
}
