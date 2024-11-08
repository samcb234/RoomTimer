import { useEffect, useState } from "react"
import Room from "../../models/Room"
import { RoomRow } from "./RoomRow"
import { useDispatch, useSelector } from "react-redux"
import { ReservationState, RoomState } from "../../stores"
import ClockFactory from "../../utils/clockFactory"

const ALLROOMS: string = 'all'
const OPENROOMS: string = 'open'
const RUNNINGROOMS: string = 'running'
const TENMINORLESS: string = 'under 10'
const PASTTIME: string = 'times up'

export const RoomTable: React.FC<{}> = (props) => {
    const dispatch = useDispatch()
    const {rooms} = useSelector((state: RoomState) => state.roomReducer)
    const {reservations} = useSelector((state: ReservationState)=> state.reservationReducer)
    const [useTable, setUseTable] = useState(true)
    const [displayRooms, setDisplayRooms] = useState<Room[]>(rooms)
    const [filter, setFilter] = useState(ALLROOMS)

    const filterRoomByTime = (room: Room, time: number): boolean => {
        if(room.reservation !== undefined && room.reservation !== null && room.reservation !== -1){
            const res = reservations.find(r=>r.id===room.reservation)
            if(res){
                return res.totalTimeOnExam < time
            }
        }
        return false
    }

    const [clock, setClock] = useState(ClockFactory.instance(1000))

    function filterRoom() {
        const filterFunction = (room: Room): boolean => {
            switch(filter){
                case ALLROOMS: {
                    return true
                }
                case OPENROOMS: {
                    return (room.reservation === undefined || room.reservation === null || room.reservation === -1) && room.available
                }
                case RUNNINGROOMS: {
                    return room.runningTimer
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

        setDisplayRooms(rooms.filter(filterFunction))

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
                    <button className={filter===ALLROOMS? "btn btn-primary mb-2": "btn btn-secondary mb-2"} onClick={()=> updateFilter(ALLROOMS)}>
                        All Rooms
                    </button>
                </div>
                <div className="col">
                    <button className={filter===OPENROOMS? "btn btn-primary mb-2": "btn btn-secondary mb-2"}  onClick={()=> updateFilter(OPENROOMS)}>
                        Open Rooms
                    </button>
                </div>
                <div className="col">
                    <button className={filter===RUNNINGROOMS? "btn btn-primary mb-2": "btn btn-secondary mb-2"}  onClick={()=> updateFilter(RUNNINGROOMS)}>
                        Running Rooms
                    </button>
                </div>
                <div className="col">
                    <button className={filter===TENMINORLESS? "btn btn-primary mb-2": "btn btn-secondary mb-2"}  onClick={()=> updateFilter(TENMINORLESS)}>
                        Under 10 Min
                    </button>
                </div>
                <div className="col">
                    <button className={filter===PASTTIME? "btn btn-primary mb-2": "btn btn-secondary mb-2"}  onClick={()=> updateFilter(PASTTIME)}>
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
                                    10 Min Warning
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
                            {rooms.map(room => (
                                <RoomRow room={room}  useTable={useTable} clock={clock}filter={filter}/>
                            ))}
                        </tbody>
                    </table>
                    :
                    <div className="row">
                        {rooms.map(room => (
                            <RoomRow room={room}  useTable={useTable} clock={clock} filter={filter}/>
                        ))}
                    </div>
                }
            </div>
        </div>
    )
}