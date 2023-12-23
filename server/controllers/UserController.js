import express from "express";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// FOR CREATING A NEW USER
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      res.status(500).json({ error: "User Already Exists" });
    } else {
      const user = await User.create({
        name,
        email,
        password,
      });

      res.status(201).json({ user });
    }
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// FOR GETTING ALL USERS DATA
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// FOR GETTING A USER DATA
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(400);
      res.json({ user });
    }
  } catch (error) {
    res.status(500);
    throw new Error("User Not Found");
  }
};

// TO DELETE A USER PROFILE
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await User.deleteOne();
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(500);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(500);
    throw new Error("Error while delting the user");
  }
};

// TO UPDATE A USER PROFILE
const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (user) {
      user.name = req.body.name;
      user.email = req.body.email;
      user.password = req.body.password;
      const updateUser = await user.save();

      res.json({
        _id: updateUser._id,
        name: updateUser.name,
        email: updateUser.email,
        isAdmin: updateUser.isAdmin,
        token: generateToken(id),
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(500);
    throw new Error("Cannot Update the user");
  }
};

// TO AUTHENTICATE A USER
const authUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
};

export { createUser, getUsers, getUser, deleteUser, updateUser, authUser };
