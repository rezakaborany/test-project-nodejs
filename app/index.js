const express = require("express");
const app = express();
const http = require("http");
const Helpers = require("./helpers");
const bodyParser = require("body-parser");
const db = require('../config/db');

module.exports = class Application {
  constructor() {
    this.setupExpress();
    this.setConfig();
    this.setRouters();
    this.setDataBase();
  }

  setupExpress() 
  {
    const server = http.createServer(app);
    db.sequelize.sync().then(() => {
      server.listen(config.port, console.log(`Listening on port ${config.port}`));
  }).catch(err => console.log("Error: " + err));
  }

  setConfig() {
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use((req, res, next) => {
      app.locals = new Helpers(req, res).getObjects();
      next();
    });
  }

  setRouters() {
    app.use(require("app/routes/web"));
  }

  setDataBase() {
    db.sequelize.authenticate().then(() => {
      console.log('Database connected...');
  }).catch(err => {
      console.log('Error: ' + err);
  })
  }

};
