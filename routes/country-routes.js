import express from 'express';
import countryController from './../controllers/country-controller.js'
const router = express.Router();

router.get('/get-all', countryController.getAll);
router.post('/add-country', countryController.addCountry);
router.post('/add-branch', countryController.addBranch);

export default router;