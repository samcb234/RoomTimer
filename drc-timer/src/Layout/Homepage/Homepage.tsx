import { useEffect, useState } from "react"
import { ReservationTable } from "../ReservationTable/ReservationTable"
import { RoomTable } from "../RoomTable/RoomTable"
import Reservation from "../../models/Reservation"
import Room from "../../models/Room"
import { AddResForm } from "../AddResForm/AddResForm"

export const Homepage = ()=>{
    
    const [reservations, setReservations] = useState<Reservation[]>([])
    
    const roomNames: string[] = ["39", '38', '36', '34', '32']
    const [rooms, setRooms] = useState<Room[]>([])

    const [newRes, setNewRes] = useState<Reservation>()

    useEffect(()=>{
        const setUpReservations = () =>{
           if(newRes !== undefined){
            const r: Reservation[] = reservations
            r.push(newRes)
            setReservations(r)
            setNewRes(undefined)
           }
        }
        setUpReservations()
    }, [newRes, reservations])


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

    function addReservation(res: Reservation){
        setNewRes(res)
    }

    function validRoomCheck(res: Reservation, room: Room){
        if(room.reservation === null){
            if(res.privateRoom){
                return room.privateRoom
            }
            if(res.computerNeeded){
                return room.hasComputer
            }
            return true
        }
    }

    function resFilter(name: string, examName: string, res: Reservation){
        return (name !== res.name) || (examName !== res.examName)
    }

    function assignToRoom(res: Reservation){
        const validRooms: Room[] = rooms.filter((room)=>validRoomCheck(res, room))
        if(validRooms.length >= 1){
            const room = validRooms[0]
            room.reservation = res
            setReservations(reservations.filter((reservation)=>resFilter(res.name, res.examName, reservation)))
        }
    }

    return(
        <div className='row'>
        <div className='col'>
          <RoomTable rooms={rooms}/>
        </div>
        <div className='col'>
            <AddResForm addReservation={addReservation}/>
          <ReservationTable reservations={reservations} assign={assignToRoom}/>
        </div>
      </div>
    )
}