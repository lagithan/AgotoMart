import {createEmployee,updateEmployee,deleteEmployee,getEmployee} from "../Contollers/Employeecontroller.js"
import { Router } from 'express';
import Employee from "../Models/Employeemodel.js";

const employee=Router();

employee.get('/get',getEmployee)
employee.post('/create',createEmployee)
employee.put('/update',updateEmployee)
employee.delete('/delete/:id',deleteEmployee)


export default employee

