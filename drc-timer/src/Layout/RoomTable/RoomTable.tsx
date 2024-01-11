import { useEffect, useState } from "react"
import Room from "../../models/Room"
import { RoomRow } from "./RoomRow"

export const RoomTable: React.FC<{ rooms: Room[], moveResToQueue: any, updateAvailableRooms: any, completedRoom: any }> = (props) => {

    const [useTable, setUseTable] = useState(true)
    return (
        <div className="container mt-3">
            <button className="btn btn-primary mb-2" onClick={()=>setUseTable(!useTable)}>
                {useTable? 'Grid View' : 'Table View'}
            </button>
            <div className="overflow-table">
                {useTable ?
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
                                    Added Time
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
                            {props.rooms.map(room => (
                                <RoomRow room={room} moveResToQueue={props.moveResToQueue} updateAvailableRooms={props.updateAvailableRooms} useTable={useTable} completedRoom={props.completedRoom}/>
                            ))}
                        </tbody>
                    </table>
                    :
                    <div className="row">
                        {props.rooms.map(room =>(
                                <RoomRow room={room} moveResToQueue={props.moveResToQueue} updateAvailableRooms={props.updateAvailableRooms} useTable={useTable} completedRoom={props.completedRoom}/>
                                ))}
                    </div>
                    }
            </div>
        </div>
    )
}