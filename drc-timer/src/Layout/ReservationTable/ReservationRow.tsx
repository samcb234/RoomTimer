import Reservation from "../../models/Reservation";

export const ReservationRow: React.FC<{reservation: Reservation}> = (props) =>{
    return(
        <tr>
            <th scope="row">
                {props.reservation.name}
            </th>
            <th>
                {props.reservation.examName}
            </th>
            <th>
                {props.reservation.timeCheck()}
            </th>
        </tr>
    )
}