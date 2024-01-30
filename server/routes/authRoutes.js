import express from 'express';
import {checkToken} from '../controllers/authController.js';
const router = express.Router();


router.get('/valid-token',checkToken);


export default router;