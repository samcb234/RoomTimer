import { useEffect, useState } from "react"
import Room from "../../models/Room"
import { RoomRow } from "./RoomRow"

export const RoomTable = ()=>{
    const roomNames: string[] = ["39", '38', '36', '34', '32']
    const [rooms, setRooms] = useState<Room[]>([])

    useEffect(()=>{
        const setUpRooms = ()=>{
            const newRooms: Room[] = []
            for(let i = 0; i < roomNames.length; i ++){
                newRooms.push(new Room(roomNames[i], null, true, true))
            }
            setRooms(newRooms)
        }
        setUpRooms()
    }, [])
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
                    {rooms.map(room =>(
                        <RoomRow room={room}/>
                    ))}
                </tbody>
            </table>
        </div>
    )
}