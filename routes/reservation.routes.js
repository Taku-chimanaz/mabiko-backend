import express from 'express';
import reservationController from '../controllers/reservation-controller.js';
import  {verifyToken} from './../verify-token.js'
const router = express.Router();


router.get('/get-reservation/:id', reservationController.getReservation);
router.post('/create-reservation', reservationController.createReservation);
router.put('/update-reservation', reservationController.updateReservation);
router.post('/send-reservation-code', reservationController.sendReservationCode);
router.post('/verify-reservation', reservationController.verifyReservation);
router.put('/cancel-reservation', reservationController.cancelReservation);
router.delete('/delete-reservation/:id', verifyToken, reservationController.deleteReservation);

export default router;