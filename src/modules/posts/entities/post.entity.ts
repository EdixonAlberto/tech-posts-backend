import { modelOptions, prop } from '@typegoose/typegoose'
import { ObjectId } from 'mongoose'

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
  _id: string
  createdAt: Date
  updatedAt: Date

  @prop({ default: '' })
  image?: string

  @prop({ required: true })
  message: string

  @prop({ default: [], ref: 'User' })
  likes?: Array<UserModel>

  @prop({ required: true, ref: 'User' })
  author: ObjectId & UserModel

  @prop({ required: true })
  location: string

  @prop({ required: true })
  status: Status
}
