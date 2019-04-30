// Packages
const express = require("express");
const helmet = require("helmet");

// Routers
const zoosRouter = require("../routers/zoos-router.js");
const bearsRouter = require("../routers/bears-router");

// Server
const server = express();
server.use(helmet());
server.use(express.json());

server.get("/", (req, res) => {
  res.send("Welcome to Web DB II Challenge!");
});

server.use("/api/zoos", zoosRouter);
server.use("/api/bears", bearsRouter);

module.exports = server;
