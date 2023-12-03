import { useState } from "react"
import Reservation from "../../models/Reservation"

export const ReservationTable = ()=>{
    const [reservations, setReservations] = useState<Reservation[]>([])

    return(
        <div className="container mt-3">
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
                            Start Time
                        </th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
        </div>
    )
}