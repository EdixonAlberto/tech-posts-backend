import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'

import { Role } from '@MODULES/users/entities/user.entity'

@Injectable()
export class AccessControlGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly jwtService: JwtService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<Role[]>('roles', context.getHandler())
    const [req] = context.getArgs() as [Request]

    // Validate authorization header
    const authHeader = req.headers.authorization
    if (!authHeader) throw new UnauthorizedException('This route require access token')

    // Validate access token
    const userData = this.validateAccessToken(authHeader)
    if (!userData) throw new UnauthorizedException('User not authorized')
    req['user'] = userData

    // Validate roles
    if (roles) {
      const validRole = roles.includes(userData.role)
      if (!validRole) throw new UnauthorizedException('Role not authorized')
    }

    return true
  }

  private validateAccessToken(authHeader?: string): IUserData | null {
    const token: string = authHeader.split('Bearer ')[1]
    const payload = this.jwtService.decode(token) as (IUserData & { iat: number; exp: number }) | null
    if (!payload) throw new UnauthorizedException('Token invalid')

    // eslint-disable-next-line
    const { iat, exp, ...userData } = payload
    return userData
  }
}
