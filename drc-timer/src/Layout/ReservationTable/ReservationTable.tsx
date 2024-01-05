import { useEffect, useState } from "react"
import Reservation from "../../models/Reservation"
import { ReservationRow } from "./ReservationRow"
import Room from "../../models/Room"

export const ReservationTable: React.FC<{reservations: Reservation[], assign:any, assignToSpecificRoom: any, rooms: Room[]}> = (props)=>{
    

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
                            Assign to Random Room
                        </th>
                        <th scope="col">
                            Assing To Specific Room
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {props.reservations.map(reservation =>(
                        <ReservationRow reservation={reservation} assignToRandomRoom={props.assign} assignToSpecificRoom={props.assignToSpecificRoom}
                        rooms={props.rooms}/>
                    ))}
                </tbody>
            </table>
        </div>
    )
}