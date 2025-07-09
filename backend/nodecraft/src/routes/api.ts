import { Router } from 'express';
import { getUsers, healthCheck } from '../app/controllers/userController';
import { validateCreateMovieCategory,validateCategoryId, getCategoriesHandler, getCategoryHandler, createMovieCategoryHandler } from '../app/controllers/movieCategoryController';
import { validateCreateMovie,ValidateMovieId, createMovieController, getMoviesController, deleteMovieController, getMovieController} from '../app/controllers/movie';


const router = Router();

router.get('/health', healthCheck);
router.get('/users', getUsers);



router.get('/movie-categories', getCategoriesHandler);
router.get('/movie-categories/:id',validateCategoryId,  getCategoryHandler);
router.post('/movie-categories', validateCreateMovieCategory, createMovieCategoryHandler);

router.get('/movies/', getMoviesController);
router.get('/movies/:movieId', ValidateMovieId, getMovieController);
router.post('/movies/', validateCreateMovie, createMovieController);
router.delete('/movies/:movieId', ValidateMovieId, deleteMovieController)




export default router;
