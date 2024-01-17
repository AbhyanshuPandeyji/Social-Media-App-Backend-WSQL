import express from 'express';


// controller import 
import { getPosts , addPost , deletePost } from '../controllers/postController.js'

const router = express.Router();



router.get("/" , getPosts );
router.post("/" , addPost );
router.delete("/:id" , deletePost );



export default router