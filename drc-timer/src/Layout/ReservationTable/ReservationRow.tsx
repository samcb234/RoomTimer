import { useDispatch } from "react-redux";
import Reservation from "../../models/Reservation";
import Room from "../../models/Room";
import { AddToSpecificRoomButton } from "../../utils/AddToSpecificRoomButton/AddToSpecificRoomButton";
import { addReservationToRoom } from "../../reducers/RoomReducer";
import { assignReservationToRoom } from "../../reducers/ReservationReducer";
import { formatTime } from "../../utils/formatTime";

export const ReservationRow: React.FC<{reservation: Reservation}> = (props) =>{
    const dispatch = useDispatch()
    const assignToRandomRoom = () => {
        dispatch(addReservationToRoom({random:true, needsComputer: props.reservation.computerNeeded,
        privateRoom: props.reservation.privateRoom, reservation: props.reservation.id}))
        dispatch(assignReservationToRoom({id: props.reservation.id}))
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
                {formatTime(props.reservation.totalTimeOnExam)}
            </th>
            <th>
                <button className="btn btn-primary" onClick={()=>assignToRandomRoom()}>Assign To Room</button>
            </th>
            <th>
                {/* <AddToSpecificRoomButton rooms={props.rooms} assign={addResToSpecificRoom} buttonString="assign to specific room"/> */}
            </th>
        </tr>
    )
}