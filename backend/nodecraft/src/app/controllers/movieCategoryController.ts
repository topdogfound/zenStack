import { Request, Response } from "express";

import { body, param, validationResult } from "express-validator";
import {
  createMovieCategory,
  getMovieCategories,
  getMovieCategory
} from "../services/movieCategory";
import {
  sendSuccess,
  sendCreated,
  sendError,
  sendValidationError,
} from "../utils/responseHandler";

export const validateCreateMovieCategory = [
  body("name").isString().notEmpty().withMessage("Name is required"),
  body("slug").isString().notEmpty().withMessage("Slug is required"),
  body("description").optional().isString(),
  body("icon").optional().isString(),
  body("popularTags").optional().isArray(),
  body("popularTags.*").optional().isString(),
  body("targetAudience").optional().isString(),
  body("tone").optional().isArray(),
  body("tone.*").optional().isString(),
];
export const validateCategoryId = [
  param("id").isMongoId().withMessage("Invalid category ID"),
];
export const createMovieCategoryHandler = async (
  req: Request,
  res: Response
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendValidationError(res, errors.array());
  }

  try {
    const category = await createMovieCategory(req.body);
    return sendCreated(res, category, "Movie category created");
  } catch (error) {
    return sendError(res, error);
  }
};

export const getCategoriesHandler = async (_: Request, res: Response) => {
  try {
    const categories = await getMovieCategories();
    sendSuccess(res, categories);
  } catch (error) {
    sendError(res, error);
  }
};

export const getCategoryHandler = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendValidationError(res, errors.array());
  }

  try {
    const category = await getMovieCategory(req.params.id);
    if (!category) {
      return sendError(res, new Error("Category not found"), 404);
    }
    sendSuccess(res, category);
  } catch (error) {
    sendError(res, error);
  }
};
