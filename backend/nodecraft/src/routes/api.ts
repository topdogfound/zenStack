import { Router } from 'express';
import { getUsers, healthCheck } from '../app/controllers/userController';
import { validateCreateMovieCategory,validateCategoryId, getCategoriesHandler, getCategoryHandler, createMovieCategoryHandler } from '../app/controllers/movieCategoryController';


const router = Router();

router.get('/health', healthCheck);
router.get('/users', getUsers);



router.get('/movie-categories', getCategoriesHandler);
router.get('/movie-categories/:id',validateCategoryId,  getCategoryHandler);
router.post('/movie-categories', validateCreateMovieCategory, createMovieCategoryHandler);




export default router;
