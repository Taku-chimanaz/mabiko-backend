import express from 'express';
import receptionistController from '../controllers/receptionist-controller.js';
const router = express.Router();

router.post('/login', receptionistController.login);
router.post('/signup', receptionistController.signup)

export default router;