import { Movie } from "../models/Movie";
import { Types } from "mongoose";

type CreateMovieInput = {
  title: string;
  synopsis?: string;
  releaseDate?: Date | string;
  durationMinutes?: number;
  director?: string;
  cast?: string[];
  category: Types.ObjectId | string;
  tags?: string[];
};

export async function createMovie(data: CreateMovieInput) {
  const movie = new Movie({
    title: data.title,
    synopsis: data.synopsis,
    releaseDate: data.releaseDate,
    durationMinutes: data.durationMinutes,
    director: data.director,
    cast: data.cast || [],
    category: data.category,
    tags: data.tags || []
  });

  return await movie.save();
}



export async function getAllMovies() {
  return await Movie.find().populate("category");
}

export async function getMovie(id : string){
    return Movie.findById(id); 

}


export async function deleteMovieById(movieId: string) {
  const deleted = await Movie.findByIdAndDelete(movieId);
  if (!deleted) throw new Error("Movie not found or already deleted");
  return deleted;
}

