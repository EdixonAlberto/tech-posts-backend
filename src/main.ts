import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { Logger, ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { resolve } from 'path'
import { writeFileSync } from 'fs'

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

  // Run dynamic page to show documentation of "OpenAPI"
  SwaggerModule.setup(PATH_DOCS, app, document, {
    customSiteTitle: 'Docs - Tech Posts Backend'
  })

  // Export documentation of "OpenAPI" in file json in /docs
  const outputPath = resolve(process.cwd(), resolve('docs', 'swagger.json'))
  writeFileSync(outputPath, JSON.stringify(document), { encoding: 'utf8' })

  // Enable cors
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

  // Set pipe global to validations of fields
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  )

  await app.listen(portHTTP, async () => {
    loggerApi.log(`Server listening in port "${portHTTP}"`)
    loggerApi.log(`Documentation OpenAPI in path "/${PATH_DOCS}"`)
  })
}
bootstrap()
