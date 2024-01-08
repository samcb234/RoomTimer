import Room from "../../models/Room"
import { RoomRow } from "./RoomRow"

export const RoomTable: React.FC<{rooms: Room[], moveResToQueue: any, updateAvailableRooms: any}> = (props)=>{
    
    return(
        <div className="container mt-3">
            <div className="overflow-table">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">
                            Room #
                        </th>
                        <th scope="col">
                            Student Name
                        </th>
                        <th scope="col">
                            Exam Name
                        </th>
                        <th scope="col">
                            Time
                        </th>
                        <th scope="col">
                            Start/Stop
                        </th>
                        <th scope="col">
                            Menu
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {props.rooms.map(room =>(
                        <RoomRow room={room} moveResToQueue={props.moveResToQueue} updateAvailableRooms={props.updateAvailableRooms}/>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    )
}