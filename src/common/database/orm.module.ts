import { Module } from '@nestjs/common'

import { OrmProvider } from './orm.provider'

@Module({
  imports: [OrmProvider],
  exports: [OrmProvider]
})
export class OrmModule {}
