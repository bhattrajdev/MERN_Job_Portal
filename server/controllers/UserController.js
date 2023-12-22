import express from "express";
import User from "../middleware/models/UserModel.js";

// FOR CREATING A NEW USER
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({ user });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// FOR GETTING ALL USER DATA
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// FOR GETTING A USER PROFILE
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(400)
      res.json({user})
    }
  } catch (error) {
  res.status(500)
  throw new Error("User Not Found")
  }
};

// TO DELETE A USER PROFILE
const deleteUser = async (req,res,next)=>{
  try{
    const user = await User.findById(req.params.id);
    if(user){
      await User.deleteOne()
      res.json({message: "User deleted successfully"})
    }else{
      res.status(500)
      throw new Error("User not found")
    }
  }catch(error){
    res.status(500)
    throw new Error("Error while delting the user");
  }
}

// TO UPDATE A USER PROFILE
const updateUser = async (req,res,next)=>{
  try{
    const user = await User.findById(req.params.id);
    if(user){
      user.name = req.body.name
      user.email = req.body.email
      user.password = req.body.password
      const updateUser = await user.save()
      
      res.json({user})
    }else{
      res.status (404)
      throw new Error ("User not found")
    }
  }catch(error){
    res.status(500)
    throw new Error("Cannot Update the user")
  }
}


export { createUser, getUsers ,getUser,deleteUser,updateUser};
