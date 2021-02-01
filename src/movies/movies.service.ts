import { Injectable } from "@nestjs/common";

@Injectable()
export class MoviesService {
  private movies = [];

  getAll(): Array<any> {
    return this.movies;
  }

  getOne(id: number): any {
    return this.movies.find(movie => movie.id === id);
  }

  deleteOne(id: number) {
    this.getOne(id);
    this.movies = this.movies.filter(movie => movie.id !== id);
  }

  create(movieData) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData
    });
  }

  update(id: number, updateData) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({ ...movie, ...updateData });
  }

}
