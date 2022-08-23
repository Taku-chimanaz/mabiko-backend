import express from 'express';
import countryController from './../controllers/country-controller.js'
const router = express.Router();

router.get('/get-all', countryController.getAll);
router.post('/add-country', countryController.addCountry);
router.put('/add-branch', countryController.addBranch);
router.put('/remove-branch', countryController.removeBranch);
router.delete('/delete-country/:id', countryController.deleteCountry);

export default router;