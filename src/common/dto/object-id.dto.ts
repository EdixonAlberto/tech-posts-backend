import { ApiProperty } from '@nestjs/swagger'
import { Matches } from 'class-validator'

export class ObjectIdDto {
  @ApiProperty({
    format: '/^[a-z0-9]{24}$/',
    example: '62d81ead14b1f43bf21f4711'
  })
  @Matches(/^[a-z0-9]{24}$/)
  readonly id: string
}
