import { Request, Response } from "express";
import { body, param, validationResult } from "express-validator";
import {
  createMovie,
  getAllMovies,
  deleteMovieById,
  getMovie,
} from "../services/movie";
import { doesCategoryExist } from "../services/movieCategory";

import {
  sendSuccess,
  sendCreated,
  sendError,
  sendValidationError,
} from "../utils/responseHandler";

// 🎯 Validation middleware
export const validateCreateMovie = [
  body("title").notEmpty().withMessage("Title is required."),
  body("category")
    .notEmpty()
    .withMessage("Category ID is required.")
    .isMongoId()
    .withMessage("Invalid category ID format.")
    .custom(async (value) => {
      const exists = await doesCategoryExist(value);
      if (!exists) throw new Error("Category does not exist.");
      return true;
    }),
  body("releaseDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid date format."),
  body("durationMinutes")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Duration must be a positive number."),
  body("cast").optional().isArray().withMessage("Cast must be an array."),
  body("tags").optional().isArray().withMessage("Tags must be an array."),
];

export const ValidateMovieId = [
  param("movieId")
    .notEmpty()
    .withMessage("Movie ID is required")
    .isMongoId()
    .withMessage("Invalid movie ID format"),
];

// 🎬 Controller
export async function createMovieController(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return sendValidationError(res, errors.array());

  try {
    const movie = await createMovie(req.body);
    return sendCreated(res, movie, "Movie created successfully.");
  } catch (err) {
    console.error("Create Movie Error:", err);
    return sendError(res, "Failed to create movie.");
  }
}

export async function getMoviesController(req: Request, res: Response) {
  try {
    const movies = await getAllMovies();
    return sendSuccess(res, movies, "Movies fetched successfully.");
  } catch (err) {
    console.error("Get Movie Error:", err);
    return sendError(res, "Failed to fetch movies.");
  }
}

export async function deleteMovieController(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return sendValidationError(res, errors.array());

  const { movieId } = req.params;
  try {
    const deletedMovie = await deleteMovieById(movieId);
    return sendSuccess(res, deletedMovie, "Movie deleted successfully");
  } catch (err: any) {
    return sendError(res, err.message || "Failed to delete movie");
  }
}

export async function getMovieController(req: Request, res: Response) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return sendValidationError(res, errors.array());
    const { movieId } = req.params;

    const movies = await getMovie(movieId);
    return sendSuccess(res, movies, "Movies fetched successfully.");
  } catch (err) {
    console.error("Get Movie Error:", err);
    return sendError(res, "Failed to fetch movies.");
  }
}
