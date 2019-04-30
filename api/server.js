// Packages
const express = require("express");
const helmet = require("helmet");

// Routers
const zoosRouter = require("../routers/zoos-router.js");

// Server
const server = express();
server.use(helmet());
server.use(express.json());

server.get("/", (req, res) => {
  res.send("Welcome to Web DB II Challenge!");
});

server.use("/api/zoos", zoosRouter);

module.exports = server;
