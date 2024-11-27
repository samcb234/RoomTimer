import { useDispatch, useSelector } from "react-redux";
import Reservation from "../../models/Reservation";
import Room from "../../models/Room";
import { AddToSpecificRoomButton } from "../../utils/AddToSpecificRoomButton/AddToSpecificRoomButton";
import { addReservationToRoom } from "../../reducers/RoomReducer";
import { assignReservationToRoom, deleteExam, setCurReservation } from "../../reducers/ReservationReducer";
import { formatTime } from "../../utils/formatTime";
import { RoomState } from "../../stores";

export const ReservationRow: React.FC<{ reservation: Reservation }> = (props) => {
    const dispatch = useDispatch()
    const { rooms } = useSelector((state: RoomState) => state.roomReducer)
    const assignToRandomRoom = () => {
        dispatch(addReservationToRoom({
            random: true, needsComputer: props.reservation.computerNeeded,
            privateRoom: props.reservation.privateRoom, reservation: props.reservation.id
        }))
        dispatch(assignReservationToRoom({ id: props.reservation.id }))
    }
    function addResToSpecificRoom(roomName: string) {
        dispatch(addReservationToRoom({
            random: false, needsComputer: props.reservation.computerNeeded,
            privateRoom: props.reservation.privateRoom, reservation: props.reservation.id, roomName: roomName
        }))
        dispatch(assignReservationToRoom({ id: props.reservation.id }))
    }

    function validRoom(room: Room): boolean {
        return room.reservation === -1 && room.available &&
            !(props.reservation.privateRoom && !room.privateRoom) &&
            !(props.reservation.computerNeeded && !room.hasComputer)
    }

    function deleteReservation() {
        dispatch(deleteExam({ id: props.reservation.id }))
    }

    const setCurrentReservation = () => {
        dispatch(setCurReservation({id: props.reservation.id, resAction: 'edit'}))
    }

    return (
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
                <button className="btn btn-primary" onClick={() => assignToRandomRoom()}>Assign To Room</button>
            </th>
            <th>
                <AddToSpecificRoomButton rooms={rooms.filter(room => validRoom(room))} assign={addResToSpecificRoom} 
                buttonString="assign to specific room" dismissModal={false}/>
            </th>
            <th>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        ...
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><button className="dropdown-item" onClick={() => deleteReservation()}>Delete</button></li>
                        <li>
                            <button onClick={()=> setCurrentReservation()} type="button" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Edit
                            </button>
                        </li>
                    </ul>
                </div>
            </th>
        </tr>
    )
}