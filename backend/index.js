const express = require('express');
const cors = require('cors');
const volleyball = require('volleyball');

const sequelize = require('./config/db');

const app = express();
const port = 3000;

app.use(cors());
app.options('*', cors());
app.use(volleyball);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const endPointsRoute = require('./routes/endpoints.js');

app.use('/api', endPointsRoute);

app.get('/', (req, res) => {
    res.send('Klarway Tecnical Interview!');
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Sequelize Connection successfully.');

        app.listen(port, () => {
            console.log(`Tecnical Interview listening at http://localhost:${port}`);
        });
    })
    .catch((error) => console.log('Unable to connect:', error));
