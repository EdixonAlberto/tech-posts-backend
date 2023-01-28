import { ApiProperty } from '@nestjs/swagger'
import { Matches } from 'class-validator'

export class ObjectIdDto {
  @ApiProperty()
  @Matches(/^[a-z0-9]{24}$/)
  readonly id: string
}
