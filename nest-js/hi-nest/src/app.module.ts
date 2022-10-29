import { Module } from '@nestjs/common';
import { MoviesController } from './movies/movies.controller';
import { MoviesService } from './movies/movies.service';


// 모든 모듈의 루트 모듈 역할
// 데코레이터 : 클래스에 함수 기능을 추가할 수 있음.
@Module({
  imports: [],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class AppModule {}
