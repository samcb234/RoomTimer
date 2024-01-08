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
    const [availableRooms, setAvailableRooms] = useState<Room[]>([])

    const [updateAvailableRooms, setUpdateAvailableRooms] = useState(true)

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
                newRooms.push(new Room(roomNames[i], null, true, true, true))
            }
            setRooms(newRooms)
        }
        setUpRooms()
        setUpdateAvailableRooms(!updateAvailableRooms)
    }, [])


    useEffect(() => {
        setAvailableRooms(rooms.filter(room => {return room.available && (room.reservation === undefined || room.reservation === null)}))
    }, [updateAvailableRooms])

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
            return room.available
        }
    }

    function resFilter(name: string, examName: string, res: Reservation){
        return (name !== res.name) || (examName !== res.examName)
    }

    function assignToRandomRoom(res: Reservation){
        const validRooms: Room[] = rooms.filter((room)=>validRoomCheck(res, room))
        if(validRooms.length >= 1){
            const room = validRooms[0]
            room.reservation = res
            updateResQueue(res)
            setUpdateAvailableRooms(!updateAvailableRooms)
        }
    }

    function assignToSpecificRoom(res: Reservation, room: Room){
        if(room.available && (room.reservation === undefined || room.reservation === null)){
            room.reservation = res
            updateResQueue(res)
            setUpdateAvailableRooms(!updateAvailableRooms)
        }
    }

    function updateResQueue(res: Reservation){
        setReservations(reservations.filter((reservation)=>resFilter(res.name, res.examName, reservation)))
        setUpdateAvailableRooms(!updateAvailableRooms)
    }

    function startRoomUpdate(){
        setUpdateAvailableRooms(!updateAvailableRooms)
    }

    window.addEventListener('beforeunload', function (e: any){
        console.log('here')
        e.preventDefault()
        e.returnValue = ''
    })

    return(
        <div className='row'>
        <div className='col'>
          <RoomTable rooms={rooms}moveResToQueue={addReservation} updateAvailableRooms={startRoomUpdate}/>
        </div>
        <div className='col'>
            <AddResForm addReservation={addReservation} addDirectToRandomRoom={assignToRandomRoom} availableRooms={availableRooms} updateAvailableRooms={startRoomUpdate}/>
          <ReservationTable reservations={reservations} assign={assignToRandomRoom} assignToSpecificRoom={assignToSpecificRoom} 
          rooms={availableRooms}/>
        </div>
      </div>
    )
}