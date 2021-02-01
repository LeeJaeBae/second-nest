import { Test, TestingModule } from "@nestjs/testing";
import { MoviesService } from "./movies.service";
import { Movie } from "./entities/movie.entity";
import { NotFoundException } from "@nestjs/common";

describe("MoviesService", () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService]
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("getAll", () => {
    it("should return an array", () => {
      expect(service.getAll()).toBeInstanceOf(Array);
    });
  });

  describe("getOne", () => {
    it("should return a movie", () => {
      service.create({
        title: "TestMovie",
        year: 2000,
        genres: ["test"]
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });
    it("should throw 404 error", () => {
      try {
        service.getOne(999);
      } catch
        (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Movie with ID;999 is not found.`);
      }
    });
  });

  describe("deleteOne", () => {
    it("should delete a movie", () => {
      service.create({
        title: "TestMovie",
        year: 2000,
        genres: ["test"]
      });
      const allMovies = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(allMovies);
    });
    it("should return a 404", () => {
      try {
        service.deleteOne(9999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe("createMovie", () => {
    it("should create a movie", () => {
      const allMovies = service.getAll().length;
      service.create({
        title: "TestMovie",
        year: 2000,
        genres: ["test"]
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(allMovies);
    });
  });
});
