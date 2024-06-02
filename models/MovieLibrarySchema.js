import mongoose from "mongoose";

const MovieLibrarySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    playlistName: {
        type: 'string',
        required: true
    },
    movies: [{
        Poster: 'string',
        Title: 'string',
        Type: 'string',
        Year: 'number',
        imdbID: 'string'
    }],
});

const MovieLibrary = mongoose.model('MOVIELIBRARY', MovieLibrarySchema);
export default MovieLibrary;
