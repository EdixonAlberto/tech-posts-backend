import { modelOptions, prop } from '@typegoose/typegoose'

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
  _id: string
  createAt: Date
  updateAt: Date

  @prop({ default: '' })
  avatar?: string

  @prop({ required: true, unique: true })
  username: string

  @prop({ required: true })
  name: string

  @prop({ required: true })
  surname: string

  @prop({ required: true })
  role: Role
}
