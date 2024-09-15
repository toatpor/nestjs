import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  // nestFactory use in order to create the nestjs App
  const app = await NestFactory.create(AppModule);

  // activate the validation pipe globally
  // no need to add validationPipe to all controller
  // controller method have DTO class associated with
  // nest.js will automatic validate incoming request for us
  app.useGlobalPipes(
    new ValidationPipe({
      // if any property doesn't exist inside your DTO,
      // nest.js will not carry that property inside to controller
      whitelist: true,
      // forbids for any additional property that is being sent along with request
      forbidNonWhitelisted: true,
      //transform the incoming request to an instance of the Dto class after validation
      transform: true,

      // validation pipe is going to take care of implicitly converting
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // swagger configuration
  const config = new DocumentBuilder()
    .setTitle('NestJs masterclass - Blog app Api')
    .setDescription('Use the base API URL as http://localhost:3000')
    .setTermsOfService('http://localhost:3000/terms-of-service')
    .setLicense(
      'MIT License',
      'https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt',
    )
    .addServer('http://localhost:3000')
    .setVersion('1.0')
    .build();
  // Instantiate Document create document inside swagger
  const document = SwaggerModule.createDocument(app, config);

  // Set up your document first argument path to your document
  SwaggerModule.setup('document', app, document);

  await app.listen(3000);
}
bootstrap();
