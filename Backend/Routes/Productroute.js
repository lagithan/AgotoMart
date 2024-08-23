import {Addproduct,getproduct,deleteproduct,updateproduct,searchproduct} from '../Contollers/Productcontoller.js'
import { Router } from 'express';


const product =Router();

product.post('/add',Addproduct);
product.get('/get',getproduct)
product.put('/update/:id',updateproduct)
product.get('/search/:pname',searchproduct)
product.delete('/delete/:id',deleteproduct)

export default product

