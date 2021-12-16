const route = require('express').Router();
const movies = require('../controllers/Movies');

route.get('/test-db', movies.testConection);

route.get('/movies', movies.getAll);

route.get('/movies/qualifications', movies.getQualificationsByMovie);

route.get('/movies/best', movies.getBestMovie);

route.post('/movies', movies.updateMovie);

route.put('/movies', movies.updateMovie);

route.delete('/movies', movies.deleteMovie);

module.exports = route;
