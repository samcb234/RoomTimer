import { useState } from "react";
import Room from "../../models/Room";

export const AddToSpecificRoomButton: React.FC<{ rooms: Room[], assign: any, buttonString: string, dismissModal: boolean}> = (props) => {

    const [roomName, setRoomName] = useState<string>('');

    const filterRooms = (room: Room) => {
        if (room.name.toLowerCase().includes(roomName.toLowerCase())) {
            return true;
        }
        return false;
    }
    return (
        <div className="dropdown" >
            <input type="search" className="form-control" placeholder="search for a room" value={roomName} onChange={(e) => setRoomName(e.target.value)} />
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                {props.buttonString}
            </button>
            <ul className="dropdown-menu" style={{height:'200px', overflow:'auto'}}>
                {props.rooms.filter(filterRooms).map(room => (
                    <li><a className="dropdown-item" href="#" onClick={()=>props.assign(room.name)}data-bs-dismiss={props.dismissModal? 'modal':''}>{room.name}</a></li>
                ))}
            </ul>
        </div>
    )
}