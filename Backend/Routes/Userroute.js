import {
  createaddress,
  updateUser,
  deleteuser,
} from "../Contollers/Usercontroller.js";
import { Router } from "express";

const user = Router();
user.put("/update/:id", updateUser);
user.post("/createaddress", createaddress);
user.delete("/delete/:id", deleteuser);

export default user;
