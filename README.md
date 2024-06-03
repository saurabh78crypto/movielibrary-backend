# Movie Library App Backend

## Installation

### Setting up the project

1. Clone the repository
``
https://github.com/saurabh78crypto/movielibrary-backend.git
``
2. Navigate to the project directory
```
cd movielibrary-backend
```
3. Install dependencies
```
npm install
```
4. Create a .env file in the root of the server directory and add following variables
```
PORT (Port Number)
BASE_URL 
CON_URL (MONGODB Connection URL)
API_KEY (OMDB API `https://www.omdbapi.com/`)
JWT_SECRET_KEY
CORS_ORIGIN
CORS_METHODS
```
5. Start the server
```
npm start
```
## Usage

After starting the server, you can access the backend API by navigating to `http://localhost:5000/api/auth/` in your web browser or using a tool like Postman to test the API endpoints.

## Deployment

The backend is deployed on Render. You can access the live backend at `https://movielibrary-backend-jw44.onrender.com`.