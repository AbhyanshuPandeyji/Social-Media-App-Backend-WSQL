import express from 'express';


// controller import 
import { getUser } from '../controllers/userController.js'

const router = express.Router();


// we wont be writing our functions here , for that we use controller file 
router.get("/find/:userId" , getUser )


// to export the router from here which hold all the routes in it , to default , 
// whenever someone ask for the import from it as file , it will get the router as default
export default router;