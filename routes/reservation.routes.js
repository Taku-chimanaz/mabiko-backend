import express from 'express';
import reservationController from '../controllers/reservation-controller.js';
const router = express.Router();


router.get('/get-reservation/:id', reservationController.getReservation);
router.post('/create-reservation', reservationController.createReservation);
router.put('/update-reservation', reservationController.updateReservation);
router.post('/send-reservation-code', reservationController.sendReservationCode);
router.post('/verify-reservation', reservationController.verifyReservation);
router.delete('/delete-reservation/:id', reservationController.deleteReservation);

export default router;