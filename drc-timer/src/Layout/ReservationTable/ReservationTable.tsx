import { ReservationRow } from "./ReservationRow"
import { useSelector } from "react-redux"
import { ReservationState } from "../../stores"
import { useState } from "react"
import { SearchFilter } from "../../types"
import Reservation from "../../models/Reservation"


export const ReservationTable: React.FC<{}> = ()=>{
    const {reservations} = useSelector((state: ReservationState)=> state.reservationReducer)

    const [searchString, setSearchString] = useState('')
    const [searchFilter, setSearchFilter] = useState<SearchFilter>('student')

    const filterReservation = (res: Reservation) => {
        if(searchFilter === 'student'){
            return res.name.toLowerCase().includes(searchString.toLowerCase()) && !res.assigned
        }else{
            return res.examName.toLowerCase().includes(searchString.toLowerCase()) && !res.assigned
        }
    }

    return(
        <div className="container mt-3">
            <div className="row">
                <div className="col">
                    <select className="form-select" onChange={(e) => setSearchFilter(e.target.value as SearchFilter)}>
                        <option selected value="student">Student</option>
                        <option value="class">Class</option>
                    </select>
                </div>
                <div className="col">
                    <input type="search" className="form-control" value={searchString} onChange={(e)=> setSearchString(e.target.value)}
                        placeholder="search for student names, classes" />
                </div>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">
                            Student Name
                        </th>
                        <th scope="col">
                            Exam Name
                        </th>
                        <th scope="col">
                            Exam Length
                        </th>
                        <th scope="col">
                            Assign To Specific Room
                        </th>
                        <th scope="col">
                            ...
                            </th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.filter(filterReservation).map(reservation =>(
                        <ReservationRow reservation={reservation} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}