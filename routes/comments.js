import express from 'express';


// controller import 
import { getComments , addComment } from '../controllers/commentController.js'

const router = express.Router();



router.get("/" , getComments);
router.post("/" , addComment);



export default router