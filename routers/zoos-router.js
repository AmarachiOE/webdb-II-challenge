const knex = require('knex');
const zoosRouter = require('express').Router();

const knexConfig = {
    client: "sqlite3",
    connection: {
        filename: "./data/lambda.sqlite3"
    },
    useNullAsDefault: true,
    debug: true
};

const db = knex(knexConfig);

zoosRouter.get('/', (req, res) => {
    res.send("Start writing your code")
});

module.exports = zoosRouter;