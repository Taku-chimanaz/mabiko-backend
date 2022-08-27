import express from 'express';
import countryController from './../controllers/country-controller.js'
import { verifyToken } from '../verify-token.js';
const router = express.Router();

router.get('/get-all', countryController.getAll);
router.post('/add-country', verifyToken, countryController.addCountry);
router.put('/add-branch', verifyToken, countryController.addBranch);
router.put('/remove-branch', verifyToken, countryController.removeBranch);
router.delete('/delete-country/:id', verifyToken, countryController.deleteCountry);

export default router;