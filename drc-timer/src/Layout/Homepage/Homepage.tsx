import { useEffect, useState } from "react"
import { ReservationTable } from "../ReservationTable/ReservationTable"
import { RoomTable } from "../RoomTable/RoomTable"
import Reservation from "../../models/Reservation"
import Room from "../../models/Room"
import { AddResForm } from "../AddResForm/AddResForm"
import { template, templateList } from "../../utils/Data/RoomData"

export const Homepage = ()=>{
    
    const [reservations, setReservations] = useState<Reservation[]>([])
    
    const [rooms, setRooms] = useState<Room[]>([])
    const [availableRooms, setAvailableRooms] = useState<Room[]>([])

    const [updateAvailableRooms, setUpdateAvailableRooms] = useState(true)

    const [newRes, setNewRes] = useState<Reservation>()

    const [completedRoom, setCompletedRoom] = useState<Room>()

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
            for(let i = 0; i < templateList.length; i ++){
                const template: template = templateList[i]
                newRooms.push(new Room(template.name, null, template.privateRoom, template.hasComputer, true))
            }
            setRooms(newRooms)
        }
        setUpRooms()
        setUpdateAvailableRooms(!updateAvailableRooms)
    }, [])


    useEffect(() => {
        setAvailableRooms(rooms.filter(room => {return room.available && (room.reservation === undefined || room.reservation === null)}))
    }, [updateAvailableRooms])

    useEffect(() => {
        const updateOrder = () =>{
            if(completedRoom !== undefined){
                const oldOrder: Room[] = rooms
                const newOrder: Room[] = [completedRoom]
                for(let i = 0; i < oldOrder.length; i ++){
                    if(oldOrder[i].name !== completedRoom.name){
                        newOrder.push(oldOrder[i])
                    }
                }
                setRooms(newOrder)
                setCompletedRoom(undefined)
            }
        }
        updateOrder()
    }, [completedRoom])

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
          <RoomTable rooms={rooms}moveResToQueue={addReservation} updateAvailableRooms={startRoomUpdate} completedRoom={setCompletedRoom}/>
        </div>
        <div className='col'>
            <AddResForm addReservation={addReservation} addDirectToRandomRoom={assignToRandomRoom} availableRooms={availableRooms} updateAvailableRooms={startRoomUpdate}/>
          <ReservationTable reservations={reservations} assign={assignToRandomRoom} assignToSpecificRoom={assignToSpecificRoom} 
          rooms={availableRooms}/>
        </div>
      </div>
    )
}