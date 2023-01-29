import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UnauthorizedException } from '@nestjs/common'

import { Auth } from '@COMMON/decorators/auth.decorator'
import { Role } from './entities/user.entity'
import { UsersService } from './services/users.service'
import { CreateUserDto, UpdateUserDto } from './dto'
import { ObjectIdDto } from '@COMMON/dto'

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Auth(Role.Admin, Role.User)
  async create(@Body() user: CreateUserDto) {
    return this.usersService.create(user)
  }

  @Get()
  @Auth(Role.Admin)
  async findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  @Auth(Role.Admin, Role.User)
  async findOne(@Req() { user }: IRequest, @Param() { id }: ObjectIdDto) {
    return this.usersService.findOne(id)
  }

  @Patch(':id')
  @Auth(Role.Admin, Role.User)
  async update(@Req() { user }: IRequest, @Param() { id }: ObjectIdDto, @Body() userData: UpdateUserDto) {
    return this.usersService.update(id, userData)
  }

  @Delete(':id')
  @Auth(Role.Admin)
  async remove(@Param() { id }: ObjectIdDto) {
    return this.usersService.remove(id)
  }
}
