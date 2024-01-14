import express from 'express';


// controller import 
import { getLikes , addLike , deleteLike } from '../controllers/likeController.js';

const router = express.Router();



router.get("/" , getLikes );
router.post("/" , addLike);
router.delete("/" , deleteLike );



export default router