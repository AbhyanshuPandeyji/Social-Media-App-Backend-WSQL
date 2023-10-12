import express from 'express';


// controller import 
import { login , register , logout  } from '../controllers/authController.js'

const router = express.Router();



router.post("/login" , login  )
router.post("/register" , register  )
router.post("/logout" , logout  )



export default router