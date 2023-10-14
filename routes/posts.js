import express from 'express';


// controller import 
import { getPosts , addPost } from '../controllers/postController.js'

const router = express.Router();



router.get("/" , getPosts );
router.post("/" , addPost );



export default router