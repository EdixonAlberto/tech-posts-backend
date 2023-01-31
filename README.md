# Tech Post Backend

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Descripción

Api RESTful para la administración de publicaciones.

Documentación &#x279c; **[Especificación OpenAPI](https://raw.githubusercontent.com/EdixonAlberto/tech-posts-backend/main/docs/swagger.json)**

## Inicio

Antes de comenzar a desarrollar debe instalar las depedencias con yarn, copiar el [template](./.env.template) con las variables de entorno en la raiz del proyecto y ejecutar el comando `start:dev`.

```bash
yarn install
cp .env.template .env
yarn start:dev
```

Puede empezar a crear usuarios usando el endpoint `POST: /api/users`, solo podrá crear un solo usuario con rol `admin`.
> Nota: Si desea crear mas usuarios con rol `admin` deberá iniciar sesión como admin y luego usar el endpoint `POST: /api/users/admin`.

Los usuarios podrán iniciar sesión solo con su `username` para luego empezar a crear publicaciones con el endpoint `POST: /api/posts`.

Para mas información con respecto a los campos y tipos de respuestas de los endpoints consulte la especificaión de OpenAPI de este proyecto usando el endpoint `GET: /api/docs`, o bien vea el archivo json estático aquí: [Especificación OpenAPI](https://raw.githubusercontent.com/EdixonAlberto/tech-posts-backend/main/docs/swagger.json).

## Lista de Comandos

```bash
# Modo desarrollo
yarn start

# Modo desarrollo con "watch"
yarn start:dev

# Modo Producción
yarn run start:prod

# Pruebas unit
yarn test

# Pruebas e2e
yarn test:e2e

# Pruebas coverage
yarn test:cov
```

## Contribuir

Realice un fork al proyecto en el branch `develop`, introdusca sus cambios y cree un `Pull Request` hacia el branch `main`.

> NOTA: Este proyecto ha sido construido y probado usando el siguiente conjunto de tecnologías:

- node v18.13.0
- yarn v1.22.19
- nestjs/cli v9.1.9
