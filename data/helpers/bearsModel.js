const db = require("../dbConfig");

module.exports = {
  find,
  findById,
  insert,
  update,
  remove
};

/*
.where("id", "=", id)
.where("id", "=", Number(id))
.where({ id: Number(id) })

*/

function find() {
  return db("bears");
}

function findById(id) {
  return db("bears")
    .where({ id: Number(id) })
    .first();
}

function insert(bear) {
  return db("bears")
    .insert(bear)
    .then(ids => ({ id: ids[0] }));
}

function update(id, bear) {
  return db("bears")
    .where({ id: Number(id) })
    .update(bear);
}

function remove(id) {
  return db("bears")
    .where({ id: Number(id) })
    .del();
}
