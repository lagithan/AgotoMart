import {
  createaddress,
  updateUser,
  deleteuser,
  getaddress,
  getuser
} from "../Contollers/Usercontroller.js";
import { Router } from "express";

const user = Router();
user.put("/update/:id", updateUser);
user.post("/createaddress", createaddress);
user.delete("/delete/:id", deleteuser);
user.get("/getaddress/:id", getaddress)
user.get("/getuser",getuser)

export default user;
