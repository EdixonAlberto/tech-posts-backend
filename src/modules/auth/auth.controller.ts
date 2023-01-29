import { Controller, Post, Body } from '@nestjs/common'
import { ApiTags, ApiResponse } from '@nestjs/swagger'

import { AuthService } from './services/auth.service'
import { AuthData } from './entities/auth.entity'

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiResponse({ type: AuthData, status: 201 })
  async login(@Body('username') username: string): Promise<AuthData> {
    const userValid = await this.authService.validateUser(username)
    return this.authService.generateAccessToken(userValid)
  }
}
