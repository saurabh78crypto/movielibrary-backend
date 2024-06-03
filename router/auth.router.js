import express from 'express';
import authUser from '../middleware/authUser.js';
import { signup, signin, newLibrary, addMovieToLibrary, fetchPlaylists, searchMovie } from '../controller/auth.controller.js';

const auth = express.Router();

// POST
auth.post('/login', signin);
auth.post('/reguser', signup);
auth.post('/newlibrary', authUser, newLibrary);
auth.post('/addmovie', addMovieToLibrary)

// GET
auth.get('/searchmovie', authUser, searchMovie)
auth.get('/fetchplaylists', authUser, fetchPlaylists);



export {auth};
