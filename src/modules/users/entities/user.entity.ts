import { modelOptions, prop } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'

export enum Role {
  Admin = 'admin',
  User = 'user'
}

@modelOptions({
  options: { customName: 'User' },
  schemaOptions: {
    versionKey: false,
    timestamps: {
      createdAt: true,
      updatedAt: true
    }
  }
})
export class UserModel {
  @ApiProperty()
  _id: string

  @ApiProperty()
  @prop({ default: '' })
  avatar?: string

  @ApiProperty()
  @prop({ required: true, unique: true })
  username: string

  @ApiProperty()
  @prop({ required: true })
  name: string

  @ApiProperty()
  @prop({ required: true })
  surname: string

  @ApiProperty({ enum: Role })
  @prop({ required: true })
  role: Role

  @ApiProperty()
  createAt: Date

  @ApiProperty()
  updateAt: Date
}
