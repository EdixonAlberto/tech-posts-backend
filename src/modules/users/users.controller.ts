import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common'
import { ApiTags, ApiResponse } from '@nestjs/swagger'

import { Auth } from '@COMMON/decorators/auth.decorator'
import { Role, UserModel } from './entities/user.entity'
import { UsersService } from './services/users.service'
import { CreateUserDto, UpdateUserDto } from './dto'
import { ObjectIdDto } from '@COMMON/dto'

@ApiTags('Users')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiResponse({ type: UserModel, status: 201 })
  async create(@Body() user: CreateUserDto): Promise<UserModel> {
    return this.usersService.create(user)
  }

  @Post('/admin')
  @Auth(Role.Admin)
  @ApiResponse({ type: UserModel, status: 201 })
  async createAdmin(@Body() user: CreateUserDto): Promise<UserModel> {
    return this.usersService.createAdmin(user)
  }

  @Get()
  @Auth(Role.Admin)
  @ApiResponse({ type: [UserModel], status: 200 })
  async findAll(): Promise<UserModel[]> {
    return this.usersService.findAll()
  }

  @Get(':id')
  @Auth(Role.Admin, Role.User)
  @ApiResponse({ type: UserModel, status: 200 })
  async findOne(@Req() { user }: IRequest, @Param() { id }: ObjectIdDto): Promise<UserModel> {
    return this.usersService.findOne(id, user)
  }

  @Patch(':id')
  @Auth(Role.Admin, Role.User)
  @ApiResponse({ type: UserModel, status: 200 })
  async update(
    @Req() { user }: IRequest,
    @Param() { id }: ObjectIdDto,
    @Body() userData: UpdateUserDto
  ): Promise<UserModel> {
    return this.usersService.update(id, userData, user)
  }

  @Delete(':id')
  @Auth(Role.Admin)
  @ApiResponse({ type: UserModel, status: 200 })
  async remove(@Param() { id }: ObjectIdDto): Promise<UserModel> {
    return this.usersService.remove(id)
  }
}
