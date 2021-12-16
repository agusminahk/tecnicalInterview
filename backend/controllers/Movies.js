const { QueryTypes } = require('sequelize');
const sequelize = require('../config/db');

class Movies {
    async testConection(req, res, next) {
        try {
            await sequelize.authenticate();
            res.json('Connection successfully.');
        } catch (error) {
            res.json('Unable to connect:', error);
        }
    }

    async getAll(req, res, next) {
        try {
            const movies = await sequelize.query(
                `SELECT *, movies.id as id FROM movies LEFT JOIN directors ON movies.director_id = directors.id`,
                { type: QueryTypes.SELECT }
            );

            return res.json(movies);
        } catch (error) {
            return res.sendStatus(500);
        }
    }

    async getQualificationsByMovie(req, res, next) {
        try {
            const id = req.query.movie_id;
            const q = await sequelize.query('SELECT * FROM `qualifications` WHERE movie_id = ' + id, {
                type: QueryTypes.SELECT,
            });

            // Sacamos el promedio del rating y le colocamos 2 decimales
            const average = q.reduce((el, acc) => (el += acc.qualification / q.length || 0), 0).toFixed(2);

            return res.json({ reviews: q, average: parseFloat(average) });
        } catch (error) {
            return res.sendStatus(500);
        }
    }

    async getBestMovie(req, res, next) {
        try {
            const [results] = await sequelize.query(
                `SELECT m.id, m.title, m.plot, m.poster, m.year, m.genre, m.director_id, AVG(qualification) as average
                FROM movies m 
                LEFT JOIN qualifications q ON (m.id = q.movie_id)
                GROUP BY m.id
                ORDER BY average DESC`
            );
            // Solo enviamos el primer resultado, es decir, el mas alto.
            return res.json(results[0]);
        } catch (error) {
            return res.sendStatus(500);
        }
    }

    async updateMovie(req, res, next) {
        try {
            const { type } = req.query;
            const { id, title, plot, img } = req.body;

            const title_query = `UPDATE movies SET title = "${title}" WHERE id = ${id}`;
            const plot_query = `UPDATE movies SET plot = "${plot}" WHERE id = ${id}`;
            const img_query = `UPDATE movies SET poster = "${img}" WHERE id = ${id}`;

            const movie = await sequelize.query(
                type === 'title' ? title_query : type === 'plot' ? plot_query : type === 'img' ? img_query : null,
                { type: QueryTypes.UPDATE }
            );

            return res.status(201).json(movie);
        } catch (error) {
            return res.sendStatus(500);
        }
    }

    async deleteMovie(req, res, next) {
        try {
            const { id } = req.body;

            const query = `DELETE FROM movies WHERE id = "${id}"`;

            await sequelize.query(query, { type: QueryTypes.DELETE });

            return res.sendStatus(202);
        } catch (error) {
            return res.sendStatus(500);
        }
    }
}

module.exports = new Movies();
