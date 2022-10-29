import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

// 데이터 베이스 파트
@Injectable()
export class MoviesService {
    private movies:Movie[] = [];

    getAll(): Movie[]{
        return this.movies;
    }

    getOne(id: string): Movie{
        const movie = this.movies.find(movie => movie.id === parseInt(id));
        if(!movie){
            throw new NotFoundException(`Movie with ID ${id} not found`)
        }
        return movie;
    }

    deleteOne(id: string){
        this.getOne(id);
        this.movies = this.movies.filter(movie => movie.id !== parseInt(id));
    }

    create(movieData){
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData
        })
    }

    update(id: string, updateData){
        const movie = this.getOne(id);
        this.deleteOne(id);
        // push -> 임시로 배열 사용해서 DB 하는 것이므로 사용. 실제로는 사용 안 함
        this.movies.push({...movie, ...updateData});
    }
}