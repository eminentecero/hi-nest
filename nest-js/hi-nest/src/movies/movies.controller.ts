import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

// Controller 안에는 기본 라우터 설정
@Controller('movies')
export class MoviesController {

    constructor(private readonly moviesService: MoviesService){}

    // REST API
    @Get()
    getAll(): Movie[]{
        return this.moviesService.getAll();
    }
    
    // @Get("search")
    // search(@Query('year') year:string){
    //     return `We are searching for a movie made after: ${year}`
    // }

    // @Param("id"): id를 요청하는 부분. 요청하고 나서 해당 데이터를 뿌려줌.
    // 뒤에 id: string은 변수명: 변수 타입
    @Get(":id")
    getOne(@Param("id") id: string): Movie{
        return this.moviesService.getOne(id);
    }

    @Post()
    create(@Body() movieData){
        return this.moviesService.create(movieData);
    }

    @Delete("/:id")
    remove(@Param("id") movieId: string){
        return this.moviesService.deleteOne(movieId);
    }
    
    // 그냥 updateData를 하면 껍데기 포함 전체가 나와짐.
    // ...을 앞에 붙이면 껍데기가 벗겨진 채로 데이터 반환.
    @Patch('/:id')
    patch(@Param('id') movieId: string, @Body() updateData){
        return this.moviesService.update(movieId, updateData);
    }

}
