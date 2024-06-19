const express = require("express");
const router = express.Router();

const {
  handleGetAllUser,
  handlePostSingleUser,
  handleGetUserById,
  handleUpdateUser,
  handleDeleteUser,
} = require("../controllers/users.js");

router.route("/").get(handleGetAllUser).post(handlePostSingleUser);

router
  .route("/:id?")
  .get(handleGetUserById)
  .patch(handleUpdateUser)
  .delete(handleDeleteUser);

module.exports = router;
