import { Controller, Post, Body } from '@nestjs/common'

import { AuthService } from './services/auth.service'

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body('username') username: string) {
    const userValid = await this.authService.validateUser(username)
    return await this.authService.generateAccessToken(userValid)
  }
}
