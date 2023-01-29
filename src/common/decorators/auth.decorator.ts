import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger'

import { Role } from '@MODULES/users/entities/user.entity'
import { AccessControlGuard } from '@COMMON/guards/access-control.guard'

export const Auth = (...roles: Role[]) => {
  return applyDecorators(
    UseGuards(AccessControlGuard),
    SetMetadata('roles', roles),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' })
  )
}
