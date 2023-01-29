import { Module } from '@nestjs/common'

import { JwtProvider } from './jwt.provider'

@Module({
  imports: [JwtProvider],
  exports: [JwtProvider]
})
export class JwtModule {}
