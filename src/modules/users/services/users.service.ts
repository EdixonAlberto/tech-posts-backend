import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'

import { UserModel, Role } from '@MODULES/users/entities/user.entity'
import { CreateUserDto, UpdateUserDto } from '@MODULES/users/dto'

@Injectable()
export class UsersService {
  constructor(@InjectModel(UserModel) private readonly userModel: ReturnModelType<typeof UserModel>) {}

  public async create(user: CreateUserDto) {
    const inputRoleAdmin = user.role === Role.Admin
    let role: Role = Role.User

    if (inputRoleAdmin) {
      const adminExist = await this.userModel.findOne({ role: Role.Admin })
      if (adminExist)
        throw new UnauthorizedException(
          "There is already a registered admin, only admins can create others using the endpoint 'POST: /api/users/admin'"
        )
      else role = Role.Admin
    }

    const userExist = await this.userModel.findOne({ username: user.username })
    if (userExist) throw new UnauthorizedException('Username is already registered')

    const createUser = await this.userModel.create({ ...user, role })
    await createUser.save()

    return createUser
  }

  public async createAdmin(user: CreateUserDto) {
    const userExist = await this.userModel.findOne({ username: user.username })
    if (userExist) throw new UnauthorizedException('Username is already registered')

    const createAdmin = await this.userModel.create({
      ...user,
      role: Role.Admin
    })
    await createAdmin.save()

    return createAdmin
  }

  public async findAll() {
    return await this.userModel.find()
  }

  public async findOne(inputId: string, { id, role }: IUserData) {
    const userId = role === Role.Admin ? inputId : id
    const user = await this.userModel.findById(userId)
    if (!user) throw new NotFoundException('User not found')
    return user
  }

  public async update(inputId: string, userData: UpdateUserDto, { id, role }: IUserData) {
    const userId = role === Role.Admin ? inputId : id
    const updateUser = await this.userModel.findByIdAndUpdate(userId, userData, { new: true })
    if (!updateUser) throw new NotFoundException('User not found')
    return updateUser
  }

  public async remove(id: string) {
    const deleteUser = await this.userModel.findByIdAndDelete(id)
    if (!deleteUser) throw new NotFoundException('User not found')
    return deleteUser
  }
}
