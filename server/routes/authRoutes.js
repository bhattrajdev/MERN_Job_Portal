import express from 'express';
import {checkToken,destroyToken} from '../controllers/authController.js';
const router = express.Router();


router.get('/valid-token',checkToken);
router.post('/destroy-token',destroyToken);


export default router;