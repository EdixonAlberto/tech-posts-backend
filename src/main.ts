import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { Logger } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const loggerApi = new Logger('API')
  const config = app.get(ConfigService)
  const portHTTP = Number(config.get<string>('PORT') || 3000)
  const whiteList = config.get<string>('WHITE_LIST').split(',')
  const PATH_DOCS = 'api/docs'
  const pkg = await import('../package.json')
  const options = new DocumentBuilder()
    .setTitle(pkg.name.split('-').join(' ').toUpperCase())
    .setDescription(pkg.description)
    .setVersion(pkg.version)
    .build()
  const document = SwaggerModule.createDocument(app, options)

  SwaggerModule.setup(PATH_DOCS, app, document, {
    customSiteTitle: 'Docs - Tech Posts Backend'
  })

  app.enableCors({
    origin(origin, callback) {
      if (!origin || whiteList.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    methods: 'OPTIONS,GET,POST,PATCH,DELETE'
  })

  await app.listen(portHTTP, async () => {
    loggerApi.log(`Server listening in port "${portHTTP}"`)
    loggerApi.log(`Documentation OpenAPI in path "/${PATH_DOCS}"`)
  })
}
bootstrap()
