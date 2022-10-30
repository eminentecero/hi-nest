import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { Test, TestingModule } from '@nestjs/testing';
import exp from 'constants';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () =>{
    it("should return an array", () =>{

      const result = service.getAll();

      // 배열을 반환하는지 확인하기
      expect(result).toBeInstanceOf(Array);
    })
  })


  describe('getOne', () =>{


    it("should return a movie", () => {
      service.create({
        title: "Test movie",
        genres: ['test'],
        year:2000,
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it("should throw 404 error", () =>{
      try{
        service.getOne(999);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    })
  })


  describe("deleteOne", () => {

    it("deletes a movie", () =>{
      service.create({
        title: "Test movie",
        genres: ['test'],
        year:2000,
      });
      console.log(service.getAll());
      service.deleteOne(1);
      const allMovies = service.getAll();
      expect(allMovies.length).toEqual(0);
    })
    it("should return a 404", () =>{
      try{
        service.deleteOne(999);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    })

  })

  describe("create", () =>{
    it("should create a movice", () => {
      service.create({
        title: "Test movie",
        genres: ['test'],
        year:2000,
      });
      const movie = service.getAll();
      expect(movie[0].id).toEqual(1);
    })
  });

  describe("update", () =>{
    it("should update a movie", () =>{
      service.create({
        title: "Test movie",
        genres: ['test'],
        year:2000,
      });

      service.update(1, {
        title: "Updated Test"
      });

      const movie = service.getOne(1);
      expect(movie.title).toEqual('Updated Test');
    })

    it("should return a 404", () =>{
      try{
        service.update(999, {
          title: "Updated Test"
        });
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    })
  })

});
