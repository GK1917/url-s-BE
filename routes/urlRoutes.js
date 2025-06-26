const express = require("express");
const urlController = require("../controllers/urlController");
const authController = require("../controllers/authController");

const urlRouter = express.Router();

urlRouter
  .route("/")
  .get(authController.protrect, urlController.getAllUrl)
  .post(authController.protrect, urlController.addUrl);

urlRouter
  .route("/:id")
  .put(authController.protrect, urlController.updateUrl)
  .delete(authController.protrect, urlController.deleteUrl);

module.exports = urlRouter;
