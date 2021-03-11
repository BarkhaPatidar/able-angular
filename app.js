const express = require('express');
const app = express();

const path = require('path');
const cors = require('cors');

const PORT = 3000;

const sequelize = require('./util/database');

// const { User } = require('./models/user');

const routes = require('./routes/user');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use('/', routes);

sequelize.sync(). then(success => {
    app.listen(PORT, () => {
        console.log("Server is up on port ",PORT);
    });
}).catch(err => {
    console.log(err);
})

