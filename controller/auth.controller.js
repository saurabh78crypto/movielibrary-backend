import bcrypt from 'bcrypt';
import User from '../models/UserSchema.js';
import MovieLibrary from '../models/MovieLibrarySchema.js';

const signup = async (req, res) => {
    try {
        const { username, email, password, cpassword } = req.body;

        const userExist = await User.findOne({ email: email });
        
        if(userExist){
           return res.status(409).json({
                message: `User Already Registered!`
            });
        }

        let hashedPassword = await bcrypt.hash(password, 10);
        let hashedCPassword = await bcrypt.hash(cpassword, 10);

        const data = new User({
            username: username,
            email: email,
            password: hashedPassword,
            cpassword: hashedCPassword
        })

        const savedUser = await data.save();
        
        return res.json({
            statuscode: 200,
            message: 'Hurray, User Registered Successfully!',
            user: savedUser
        });
    } catch (error) {
        console.error(error);
        return res.json({
            statuscode: 500,
            error: error.message
        })
    }
}


const signin = async (req, res) => {
    try {
        let token;
        const { email, password } = req.body;
       
        const userLogin = await User.findOne({ email: email });
        if(!userLogin){
            return res.status(422).json({
                message: 'User Not Registered.'
            });
        }

        const passwordMatch = await bcrypt.compare(password, userLogin.password);
        if(!passwordMatch){
            return res.status(401).json({
                message: 'Invalid Credentials, Please try again.'
            })
        }
        
        token = await userLogin.generateAuthToken();

        return res.status(200).json({
            message: 'Logged In Successfully!',
            token: token
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
}


const newLibrary = async (req, res) => {
    try {
        const {playlistName} = req.body;

        const playlistExist = await MovieLibrary.findOne({ playlistName: playlistName });
        if(playlistExist){
            return res.status(409).json({
                message: 'Playlist Already Created.'
            });
        }

        const library = await MovieLibrary.create({
            userId: req.user._id,
            playlistName
        });

        return res.json({
            statuscode: 200,
            message: 'Playlist Created Successfully!',
            library: library
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

const addMovieToLibrary = async (req, res) => {
    try {
        const {libraryId, movie} = req.body;

        const library = await MovieLibrary.findById(libraryId);
        if(!library) {
            return res.status(404).json({
                message: 'Library Not Found.'
            });
        }

        const isMovieExist = library.movies.some(libMovie => libMovie.imdbID === movie.imdbID);
        if(isMovieExist) {
            return res.status(409).json({
                message: 'The movie already in the playlist.'
            });
        }

        library.movies.push(movie);

        await library.save();

        return res.status(200).json({
            message: 'Movie Added successfully.',
            library: library
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message:'Internal Server Error.',
            error: error.message
        });
    }
};

const fetchPlaylists = async (req, res) => {
    try {
        const userId = req.user._id;

        const libraries = await MovieLibrary.find({userId: userId});

        if(!libraries){
            return res.status(404).json({
                message: 'Library Not Found!'
            });
        }

        const playlists = libraries.map(library => ({
            _id: library._id,
            playlistName: library.playlistName,
            movies: library.movies
        }));
        
        return res.status(200).json({
            statuscode: 200,
            message: 'Playlists Retrieved Successfully!',
            playlists: playlists
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal Server Error.',
            error: error.message
        })
    }
}


export { signup, signin, newLibrary, addMovieToLibrary, fetchPlaylists }

