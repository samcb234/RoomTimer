import Reservation from "../../models/Reservation";

export const ReservationRow: React.FC<{reservation: Reservation, assign:any}> = (props) =>{
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
            <th>
                <button className="btn btn-primary" onClick={()=>props.assign(props.reservation)}>Assign To Room</button>
            </th>
        </tr>
    )
}