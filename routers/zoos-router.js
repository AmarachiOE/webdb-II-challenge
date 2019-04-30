const knex = require("knex");
const zoosRouter = require("express").Router();

const knexConfig = {
  client: "sqlite3",
  connection: {
    filename: "./data/lambda.sqlite3"
  },
  useNullAsDefault: true,
  debug: true
};

const zoosDb = knex(knexConfig);

// ============ GET ALL
zoosRouter.get("/", (req, res) => {
  zoosDb("zoos")
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: "The zoos information could not be retrieved." });
    });
});

// ============ GET BY ID
zoosRouter.get("/:id", (req, res) => {
  zoosDb("zoos")
    .where({ id: req.params.id })
    .first()
    .then(zoo => {
      if (zoo) {
        res.status(200).json(zoo);
      } else {
        res.status(404).json({ error: "This zoo could not be found." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "This zoo's information could not be retrieved." });
    });
});

// ============ POST
zoosRouter.post("/", (req, res) => {
  const zoo = req.body;
  if (!zoo || !zoo.name) {
    res.status(400).json({
      error: "You must include a zoo with a name."
    });
  } else {
    zoosDb("zoos")
      .insert(zoo, "id")
      .then(results => {
        res.status(200).json(results);
      })
      .catch(err => {
        res.status(500).json({
          error: "There was an error while saving the zoo to the database"
        });
      });
  }
});

// ============ DELETE
zoosRouter.delete("/:id", (req, res) => {
  zoosDb("zoos")
    .where({ id: req.params.id })
    .delete()
    .then(count => {
      if (count > 0) {
        res.status(200).json({
          message: `${count} ${count > 1 ? "zoos" : "zoo"} deleted`
        });
      } else {
        res.status(404).json({ error: "This zoo could not be found." });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while deleting the zoo from the database"
      });
    });
});

// ============ UPDATE
zoosRouter.put("/:id", (req, res) => {
  const zoo = req.body;
  if (!zoo || !zoo.name) {
    res.status(400).json({
      error: "You must include a zoo with a name."
    });
  } else {
    zoosDb("zoos")
      .where({ id: req.params.id })
      .update(req.body)
      .then(count => {
        if (count > 0) {
          res.status(200).json({
            message: `${count} ${count > 1 ? "zoos" : "zoo"} updated`
          });
        } else {
          res.status(404).json({ error: "This zoo could not be found." });
        }
      })
      .catch(err => {
        res.status(500).json({
          error: "There was an error while updating the zoo from the database"
        });
      });
  }
});

module.exports = zoosRouter;
