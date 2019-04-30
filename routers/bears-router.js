const bearsRouter = require("express").Router(); // is requiring express and Router simultaneously
const bearsDb = require("../data/helpers/bearsModel.js");

// ============ GET ALL
bearsRouter.get("/", (req, res) => {
  bearsDb
    .find()
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The bears information could not be retrieved." });
    });
});

// ============ GET BY ID
bearsRouter.get("/:id", (req, res) => {
  const bearId = req.params.id;
  bearsDb
    .findById(bearId)
    .then(bear => {
      if (bear) {
        res.status(200).json(bear);
      } else {
        res.status(404).json({ error: "This bear could not be found." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "This bear's information could not be retrieved." });
    });
});

// ============ POST
bearsRouter.post("/", (req, res) => {
  const bear = req.body;
  if (!bear || !bear.name) {
    res.status(400).json({
      error: "You must include a bear with a name."
    });
  } else {
    bearsDb
      .insert(bear, "id")
      .then(results => {
        res.status(200).json(results);
      })
      .catch(err => {
        res.status(500).json({
          error: "There was an error while saving the bear to the database"
        });
      });
  }
});

// ============ DELETE
bearsRouter.delete("/:id", (req, res) => {
  const bearId = req.params.id;
  bearsDb
    .remove(bearId)
    .then(count => {
      if (count > 0) {
        res.status(200).json({
          message: `${count} ${count > 1 ? "bears" : "bear"} deleted`
        });
      } else {
        res.status(404).json({ error: "This bear could not be found." });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while deleting the bear from the database"
      });
    });
});

// ============ UPDATE
bearsRouter.put("/:id", (req, res) => {
  const bear = req.body;
  const bearId = req.params.id;
  if (!bear || !bear.name) {
    res.status(400).json({
      error: "You must include a bear with a name."
    });
  } else {
    bearsDb
      .update(bearId, bear)
      .then(count => {
        if (count > 0) {
          res.status(200).json({
            message: `${count} ${count > 1 ? "bears" : "bear"} updated`
          });
        } else {
          res.status(404).json({ error: "This bear could not be found." });
        }
      })
      .catch(err => {
        res.status(500).json({
          error: "There was an error while updating the bear from the database"
        });
      });
  }
});

module.exports = bearsRouter;
