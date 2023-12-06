import { useEffect, useState } from "react"
import Reservation from "../../models/Reservation"
import { ReservationRow } from "./ReservationRow"

export const ReservationTable: React.FC<{reservations: Reservation[]}> = (props)=>{
    

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
                            Exam Length
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {props.reservations.map(reservation =>(
                        <ReservationRow reservation={reservation}/>
                    ))}
                </tbody>
            </table>
        </div>
    )
}