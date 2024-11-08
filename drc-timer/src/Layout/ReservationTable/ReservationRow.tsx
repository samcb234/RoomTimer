import { useDispatch, useSelector } from "react-redux";
import Reservation from "../../models/Reservation";
import Room from "../../models/Room";
import { AddToSpecificRoomButton } from "../../utils/AddToSpecificRoomButton/AddToSpecificRoomButton";
import { addReservationToRoom } from "../../reducers/RoomReducer";
import { assignReservationToRoom } from "../../reducers/ReservationReducer";
import { formatTime } from "../../utils/formatTime";
import { RoomState } from "../../stores";

export const ReservationRow: React.FC<{reservation: Reservation}> = (props) =>{
    const dispatch = useDispatch()
    const {rooms} = useSelector((state: RoomState)=> state.roomReducer)
    const assignToRandomRoom = () => {
        dispatch(addReservationToRoom({random:true, needsComputer: props.reservation.computerNeeded,
        privateRoom: props.reservation.privateRoom, reservation: props.reservation.id}))
        dispatch(assignReservationToRoom({id: props.reservation.id}))
    }
    function addResToSpecificRoom(roomName: string) {
        dispatch(addReservationToRoom({random:false, needsComputer: props.reservation.computerNeeded,
            privateRoom: props.reservation.privateRoom, reservation: props.reservation.id, roomName: roomName}))
        dispatch(assignReservationToRoom({id: props.reservation.id}))
    }

    function validRoom(room: Room): boolean {
        return room.reservation === -1 && room.available && 
        !(props.reservation.privateRoom && !room.privateRoom) &&
        !(props.reservation.computerNeeded && !room.hasComputer)
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
                <AddToSpecificRoomButton rooms={rooms.filter(room=> validRoom(room))} assign={addResToSpecificRoom} buttonString="assign to specific room"/>
            </th>
        </tr>
    )
}