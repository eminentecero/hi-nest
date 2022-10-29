import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MoviesService } from './movies/movies.service';


// 모든 모듈의 루트 모듈 역할
// 데코레이터 : 클래스에 함수 기능을 추가할 수 있음.
// app.module에는 다른 모듈을 연결하기만 하는 역할.
@Module({
  controllers: [AppController],
  providers: [MoviesService],
})
export class AppModule {}
