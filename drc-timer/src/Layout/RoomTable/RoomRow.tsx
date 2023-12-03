import { useState } from "react";
import Room from "../../models/Room";

export const RoomRow: React.FC<{room: Room}> = (props) =>{
    const [runTimer, setRunTimer] = useState(false)
    return(
        <tr>
            <th scope="row">
                {props.room.name}
            </th>
            <th>
                {props.room.reservation !== null ?
                <>
                {props.room.reservation.name}
                </>
                :
                <></>}
            </th>
            <th>
                time will go here
            </th>
            <th>
                <button className={!runTimer? "btn btn-primary":"btn btn-danger"} onClick={()=>setRunTimer(!runTimer)}>{runTimer ? 'Stop' : 'Start'}</button>
            </th>
        </tr>
    )
}