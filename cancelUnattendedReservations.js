import Reservation from './Models/Reservation.js';
import pkg from 'date-fns-tz';
const  { format, utcToZonedTime} = pkg;

export const  cancelUnattendedReservations = async () => {

    Reservation.find({active: true})
    .then(reservations => {
        
        reservations.forEach(reservation => {
            
            // getting local times of reservation location

            const reservationDate = utcToZonedTime(reservation.date, reservation.location);
            const reservationLocationCurrentDate = utcToZonedTime(new Date(), reservation.location);
            console.log("------------------------------------------------------")
            console.table(format(reservationDate, "yyyy-MM-dd HH-mm-ss"))
            console.log(format(reservationLocationCurrentDate, "yyyy-MM-dd HH-mm-ss"))
            console.log("------------------------------------------------------")

            // cancelling reservation after 24hr of customer not showing up or giving update

            if(reservationDate > reservationLocationCurrentDate){
                console.log("Greater")
                return
            }else if(
                reservationDate.getDate === reservationLocationCurrentDate.getDate &&
                reservationDate.getMonth === reservationLocationCurrentDate.getMonth &&
                reservationDate.getFullYear === reservationLocationCurrentDate.getFullYear    
            ){
                console.log(reservationDate.getDate(), reservationLocationCurrentDate.getDate())
                console.log("Same day")
                return;
            }

            reservation.active = false;
            reservation.stateReason = "unattended";

            try {
                reservation.save()
            } catch (error) {
                console.log(error)
            }

        })
    })
    .catch((err) => {
        console.log(err)
    })

}
