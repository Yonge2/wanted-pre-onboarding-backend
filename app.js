const express = require('express');
const morgan = require('morgan');

const { db } = require('./sequelize/models/index');
const app = express();

db.sequelize.sync({ force: true })
    .then(() => console.log('connection'))
    .catch((e) => console.log('connection err: ', e));

app.use(morgan('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/boards', require('./boards/boardRouter'));

app.listen(3000, () => {
    console.log('server start');
})