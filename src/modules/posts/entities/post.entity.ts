import { modelOptions, prop } from '@typegoose/typegoose'
import { ObjectId } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

import { UserModel } from '@MODULES/users/entities/user.entity'

export enum Status {
  Drafted = 'drafted',
  Deleted = 'deleted',
  Published = 'published'
}

@modelOptions({
  options: { customName: 'Post' },
  schemaOptions: {
    versionKey: false,
    timestamps: {
      createdAt: true,
      updatedAt: true
    }
  }
})
export class PostModel {
  @ApiProperty()
  _id: string

  @ApiProperty()
  @prop({ default: '' })
  image?: string

  @ApiProperty()
  @prop({ required: true })
  message: string

  @ApiProperty({ type: [UserModel] })
  @prop({ default: [], ref: 'User' })
  likes: Array<ObjectId & UserModel>

  @ApiProperty({ type: UserModel })
  @prop({ required: true, ref: 'User' })
  author: ObjectId & UserModel

  @ApiProperty()
  @prop({ required: true })
  location: string

  @ApiProperty({ enum: Status })
  @prop({ required: true })
  status: Status

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date
}
