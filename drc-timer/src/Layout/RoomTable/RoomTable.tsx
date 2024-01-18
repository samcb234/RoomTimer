import { useEffect, useState } from "react"
import Room from "../../models/Room"
import { RoomRow } from "./RoomRow"

const ALLROOMS: string = 'all'
const OPENROOMS: string = 'open'
const RUNNINGROOMS: string = 'running'
const TENMINORLESS: string = 'under 10'
const PASTTIME: string = 'times up'

export const RoomTable: React.FC<{ rooms: Room[], moveResToQueue: any, updateAvailableRooms: any, completedRoom: any }> = (props) => {

    const [useTable, setUseTable] = useState(true)
    const [displayRooms, setDisplayRooms] = useState<Room[]>(props.rooms)
    const [filter, setFilter] = useState(ALLROOMS)

    const filterRoomByTime = (room: Room, time: number): boolean => {
        if(room.reservation !== undefined && room.reservation !== null){
            return time < 0 ? room.runningTimer : room.runningTimer && room.reservation?.timeCheckSeconds() < time
        }
        return false
    }

    function filterRoom() {
        const filterFunction = (room: Room): boolean => {
            switch(filter){
                case ALLROOMS: {
                    return true
                }
                case OPENROOMS: {
                    return room.reservation === undefined || room.reservation === null
                }
                case RUNNINGROOMS: {
                    return filterRoomByTime(room, -1)
                }
                case TENMINORLESS: {
                    return filterRoomByTime(room, 600)
                }
                case PASTTIME: {
                    return filterRoomByTime(room, 0)
                }
                default: {
                    return true
                }
            }
        }

        setDisplayRooms(props.rooms.filter(filterFunction))

    }

    useEffect(() => {

        const interval = setInterval(() => filterRoom(), 250)

        return () => clearInterval(interval)
    })

    const updateFilter = (newFilter: string) => {
        if(filter === newFilter){
            setFilter(ALLROOMS)
        } else {
            setFilter(newFilter)
        }
    }

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col">
                    <button className="btn btn-primary mb-2" onClick={() => setUseTable(!useTable)}>
                        {useTable ? 'Grid View' : 'Table View'}
                    </button>
                </div>
                <div className="col">
                    <button className="btn btn-primary mb-2" onClick={()=> updateFilter(ALLROOMS)}>
                        All Rooms
                    </button>
                </div>
                <div className="col">
                    <button className="btn btn-primary mb-2" onClick={()=> updateFilter(OPENROOMS)}>
                        Open Rooms
                    </button>
                </div>
                <div className="col">
                    <button className="btn btn-primary mb-2" onClick={()=> updateFilter(RUNNINGROOMS)}>
                        Running Rooms
                    </button>
                </div>
                <div className="col">
                    <button className="btn btn-primary mb-2" onClick={()=> updateFilter(TENMINORLESS)}>
                        10 Min Warning
                    </button>
                </div>
                <div className="col">
                    <button className="btn btn-primary mb-2" onClick={()=> updateFilter(PASTTIME)}>
                        Finished Rooms
                    </button>
                </div>
            </div>
            <div className="overflow-table">
                {useTable ?
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">
                                    Room
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
                            {displayRooms.map(room => (
                                <RoomRow room={room} moveResToQueue={props.moveResToQueue} updateAvailableRooms={props.updateAvailableRooms} useTable={useTable} completedRoom={props.completedRoom}/>
                            ))}
                        </tbody>
                    </table>
                    :
                    <div className="row">
                        {props.rooms.map(room => (
                            <RoomRow room={room} moveResToQueue={props.moveResToQueue} updateAvailableRooms={props.updateAvailableRooms} useTable={useTable} completedRoom={props.completedRoom}/>
                        ))}
                    </div>
                }
            </div>
        </div>
    )
}