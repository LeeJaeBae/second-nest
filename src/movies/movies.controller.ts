import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";

@Controller("movies")
export class MoviesController {
  @Get()
  getAll(): [] {
    return [];
  }

  @Get(":id")
  getOne(@Param("id") movieId): any {
    return;
  }

  @Post()
  create(@Body() movieData) {

  }

  @Delete(":id")
  remove(@Param("id") movieId) {

  }

  @Patch(":id")
  patch(@Param("id") movieId) {
    
  }
}
