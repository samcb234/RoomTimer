import { useEffect, useState } from "react"
import Reservation from "../../models/Reservation"
import { ReservationRow } from "./ReservationRow"
import Room from "../../models/Room"
import { useSelector } from "react-redux"
import { ReservationState } from "../../stores"
import AddOrEditModal from "../AddResForm/AddOrEditModal"

export const ReservationTable: React.FC<{}> = (props)=>{
    const {reservations} = useSelector((state: ReservationState)=> state.reservationReducer)

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
                        <th scope="col">
                            Assign To Specific Room
                        </th>
                        <th scope="col">
                            ...
                            </th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.filter(res=> !res.assigned).map(reservation =>(
                        <ReservationRow reservation={reservation} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}