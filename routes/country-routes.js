import express from 'express';
import countryController from './../controllers/country-controller.js'
const router = express.Router();

router.get('/get-all', countryController.getAll)

export default router;