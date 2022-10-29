import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    forbidNonWhitelisted: true,  // 이상한 요청 보내면 아예 req 막음
    transform: true, // 유저들이 보낸 거를 우리가 원하는 실제 타입으로 변환
  }));
  await app.listen(3000);
}
bootstrap();
