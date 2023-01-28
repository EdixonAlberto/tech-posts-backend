import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'

import { UsersService } from './services/users.service'
import { CreateUserDto, UpdateUserDto } from './dto'
import { ObjectIdDto } from '@COMMON/dto'

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() user: CreateUserDto) {
    return this.usersService.create(user)
  }

  @Get()
  async findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  async findOne(@Param() { id }: ObjectIdDto) {
    return this.usersService.findOne(id)
  }

  @Patch(':id')
  async update(@Param() { id }: ObjectIdDto, @Body() userData: UpdateUserDto) {
    return this.usersService.update(id, userData)
  }

  @Delete(':id')
  async remove(@Param() { id }: ObjectIdDto) {
    return this.usersService.remove(id)
  }
}
