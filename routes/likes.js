import express from 'express';


// controller import 
import { getLikes } from '../controllers/likeController.js';

const router = express.Router();



router.get("/" , getLikes );



export default router