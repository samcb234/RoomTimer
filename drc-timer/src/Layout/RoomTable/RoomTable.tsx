import { useState } from "react"
import { RoomRow } from "./RoomRow"
import { useSelector } from "react-redux"
import { RoomState } from "../../stores"
import ClockFactory from "../../utils/clockFactory"
import { SearchFilter } from "../../types"

const ALLROOMS: string = 'all'
const OPENROOMS: string = 'open'
const RUNNINGROOMS: string = 'running'
const TENMINORLESS: string = 'under 10'
const PASTTIME: string = 'times up'

export const RoomTable: React.FC<{}> = (props) => {
    const { rooms } = useSelector((state: RoomState) => state.roomReducer)
    const [useTable, setUseTable] = useState(true)
    const [filter, setFilter] = useState(ALLROOMS)
    const [search, setSearch] = useState('')
    const [searchFilter, setSearchFilter] = useState<SearchFilter>('student')

    const [clock, setClock] = useState(ClockFactory.instance(1000))


    const updateFilter = (newFilter: string) => {
        if (filter === newFilter) {
            setFilter(ALLROOMS)
        } else {
            setFilter(newFilter)
        }
    }

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col">
                    <select className="form-select" onChange={(e) => updateFilter(e.target.value)}>
                        <option selected value={ALLROOMS}>All Rooms</option>
                        <option value={OPENROOMS}>Open Rooms</option>
                        <option value={RUNNINGROOMS}>Running Rooms</option>
                        <option value={TENMINORLESS}>Under 10 Min</option>
                        <option value={PASTTIME}>Times Up</option>
                    </select>
                </div>
                <div className="col">
                    <input type="search" className="form-control" value={search} onChange={(e) => setSearch(e.target.value)}
                        placeholder="search for student names, classes, or professor names" />
                </div>
                <div className="col">
                    <select className="form-select" onChange={(e) => setSearchFilter(e.target.value as SearchFilter)}>
                        <option selected value="student">Student</option>
                        <option value="class">Class</option>
                        <option value="professor">Professor</option>
                    </select>
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
                                <RoomRow room={room} useTable={useTable} clock={clock} filter={filter} searchString={search}
                                    searchFilter={searchFilter} />
                            ))}
                        </tbody>
                    </table>
                    :
                    <div className="row">
                        {rooms.map(room => (
                            <RoomRow room={room} useTable={useTable} clock={clock} filter={filter} searchString={search}
                                searchFilter={searchFilter} />
                        ))}
                    </div>
                }
            </div>
        </div>
    )
}