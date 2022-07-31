module.exports = app => {
  const express = require("express");
  const path = require("path");
  const inflection = require("inflection");
  const allModel = require("require-all")(
    path.join(__dirname, "..", "..", "models")
  );

  const router = express.Router()

}