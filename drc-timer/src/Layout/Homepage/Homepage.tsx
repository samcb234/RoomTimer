import { useEffect, useState } from "react"
import { ReservationTable } from "../ReservationTable/ReservationTable"
import { RoomTable } from "../RoomTable/RoomTable"
import Reservation from "../../models/Reservation"
import Room from "../../models/Room"

export const Homepage = ()=>{
    const resNames: string[] = ['sam block', 'santa jolicoeur']
    const examNames: string[] = ['algo', 'ood']
    const resLengths: number[] = [90, 150]
    const privateRooms: boolean[] = [false, true]
    const computerNeeded: boolean[] = [false, false]
    const onlineExam: boolean[] = [false, false]
    const [reservations, setReservations] = useState<Reservation[]>([])

    const roomNames: string[] = ["39", '38', '36', '34', '32']
    const [rooms, setRooms] = useState<Room[]>([])

    useEffect(()=>{
        const setUpReservations = () =>{
            const newRes: Reservation[] = []
            for(let i = 0; i < 2; i++){
                newRes.push(new Reservation(resNames[i], examNames[i], null,
                    resLengths[i] * 60, privateRooms[i], computerNeeded[i], onlineExam[i]))
            }
            setReservations(newRes)
        }
        setUpReservations()
    }, [])


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
        <div className='row'>
        <div className='col'>
          <RoomTable rooms={rooms}/>
        </div>
        <div className='col'>
          <ReservationTable reservations={reservations}/>
        </div>
      </div>
    )
}