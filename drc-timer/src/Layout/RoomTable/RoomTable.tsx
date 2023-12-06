import { useEffect, useState } from "react"
import Room from "../../models/Room"
import { RoomRow } from "./RoomRow"

export const RoomTable: React.FC<{rooms: Room[]}> = (props)=>{
    
    return(
        <div className="container mt-3">
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
                            Time
                        </th>
                        <th scope="col">
                            Start/Stop
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {props.rooms.map(room =>(
                        <RoomRow room={room}/>
                    ))}
                </tbody>
            </table>
        </div>
    )
}