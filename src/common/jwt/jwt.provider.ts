import { DynamicModule } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt'

export const JwtProvider: DynamicModule = JwtModule.registerAsync({
  inject: [ConfigService],
  async useFactory(config: ConfigService) {
    return <JwtModuleOptions>{
      secret: config.get<string>('JWT_SECRET'),
      signOptions: { expiresIn: config.get<string>('JWT_EXPIRES') }
    }
  }
})
