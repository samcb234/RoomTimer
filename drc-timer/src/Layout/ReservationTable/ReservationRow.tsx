import Reservation from "../../models/Reservation";
import Room from "../../models/Room";
import { AddToSpecificRoomButton } from "../../utils/AddToSpecificRoomButton/AddToSpecificRoomButton";

export const ReservationRow: React.FC<{reservation: Reservation, assignToRandomRoom:any, assignToSpecificRoom:any, rooms: Room[]}> = (props) =>{
    
    function addResToSpecificRoom(room: Room){
        props.assignToSpecificRoom(props.reservation, room)   
    }
    return(
        <tr>
            <th scope="row">
                {props.reservation.name}
            </th>
            <th>
                {props.reservation.examName}
            </th>
            <th>
                {props.reservation.timeCheckString()}
            </th>
            <th>
                <button className="btn btn-primary" onClick={()=>props.assignToRandomRoom(props.reservation)}>Assign To Room</button>
            </th>
            <th>
                <AddToSpecificRoomButton rooms={props.rooms} assign={addResToSpecificRoom} buttonString="assign to specific room"/>
            </th>
        </tr>
    )
}