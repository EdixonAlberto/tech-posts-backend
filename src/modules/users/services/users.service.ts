import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'

import { UserModel } from '@MODULES/users/entities/user.entity'
import { CreateUserDto, UpdateUserDto } from '@MODULES/users/dto'

@Injectable()
export class UsersService {
  constructor(@InjectModel(UserModel) private readonly userModel: ReturnModelType<typeof UserModel>) {}

  public async create(user: CreateUserDto) {
    const userExist = await this.userModel.findOne({ username: user.username })
    if (userExist) throw new UnauthorizedException('Username is already registered')

    const createUser = await this.userModel.create(user)
    await createUser.save()

    return createUser
  }

  public async findAll() {
    return await this.userModel.find()
  }

  public async findOne(id: string) {
    const user = await this.userModel.findById(id)
    if (!user) throw new NotFoundException('User not found')
    return user
  }

  public async update(id: string, userData: UpdateUserDto) {
    const updateUser = await this.userModel.findByIdAndUpdate(id, userData, { new: true })
    if (!updateUser) throw new NotFoundException('User not found')
    return updateUser
  }

  public async remove(id: string) {
    const deleteUser = await this.userModel.findByIdAndDelete(id)
    if (!deleteUser) throw new NotFoundException('User not found')
    return deleteUser
  }
}
