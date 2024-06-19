const { User } = require("../models/users.js");

async function handleGetAllUser(req, res) {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "failed",
      msg: "something went wrong",
    });
  }
}

async function handlePostSingleUser(req, res) {
  const user = req.body;
  if (
    !user ||
    !user.first_name ||
    !user.last_name ||
    !user.email ||
    !user.gender ||
    !user.job_title
  ) {
    return res.status(400).json({
      msg: "all fields required",
    });
  }
  console.log(user);
  try {
    const result = await User.create({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      gender: user.gender,
      job_title: user.job_title,
    });
    console.log("user added successfully");
    return res.status(201).json({
      status: "success",
      msg: "added successfully",
      user: result.toJSON(),
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: "failed" });
  }
}

async function handleGetUserById(req, res) {
  const userId = req.params.id;
  if (!userId) {
    return res.status(404).json({
      status: "failed",
      msg: "id field empty",
    });
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Invalid user ID" });
    }
    console.log("Success");
    console.log(user);
    return res.status(200).json({
      status: "success",
      user: user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: "failed" });
  }
}

async function handleUpdateUser(req, res) {
  const id = req.params.id;
  if (!id) {
    return res.status(404).json({
      status: "failed",
      msg: "id field empty",
    });
  }
  try {
    const patch_details = req.body;
    const result = await User.findOneAndUpdate({ _id: id }, patch_details, {
      new: true,
    });
    if (result) {
      console.log("Patched Successfully");
      console.log(result);
      return res.status(200).json({
        status: "success",
        user: result,
      });
    } else {
      return res.status(404).json({
        status: "failed",
        msg: "user not found",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "failed",
      msg: "something went wrong",
    });
  }
}

async function handleDeleteUser(req, res) {
  const id = req.params.id;
  if (!id) {
    return res.status(404).json({
      msg: "id field empty",
    });
  }
  try {
    const result = await User.findByIdAndDelete(id);

    console.log("Deleted Successfully");
    console.log(result);
    return res.status(200).json({
      status: "success",
      user: result,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: "something went wrong",
    });
  }
}

module.exports = {
  handleGetAllUser,
  handlePostSingleUser,
  handleGetUserById,
  handleUpdateUser,
  handleDeleteUser,
};
