import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import Room from "../models/Room"
import { editCurReservation } from "../reducers/ReservationReducer"
import { RoomState, ReservationState } from "../stores"

const useResForm = () => {
    const {rooms} = useSelector((state: RoomState)=> state.roomReducer)
    const {reservationId, curReservation} = useSelector((state: ReservationState)=> state.reservationReducer)
    const [privateRoomFlag, setPrivateRoomFlag] = useState(curReservation.privateRoom)
    const [computerNeededFlag, setComputerNeededFlag] = useState(curReservation.computerNeeded)
    const dispatch = useDispatch()

    useEffect(()=>{
        setPrivateRoomFlag(curReservation.privateRoom)
        setComputerNeededFlag(curReservation.computerNeeded)
    }, [curReservation.privateRoom, curReservation.computerNeeded])

    function validRoom(room: Room): boolean {
        return room.reservation === -1 && room.available && 
        !(privateRoomFlag && !room.privateRoom) &&
        !(computerNeededFlag && !room.hasComputer)
    }

    const setName = (name: string) => {
        dispatch(editCurReservation({...curReservation, name: name}))
    }

    const setExamName = (examName: string) => {
        dispatch(editCurReservation({...curReservation, examName: examName}))
    }

    const setTotalTimeOnExam = (time: number) => {
        dispatch(editCurReservation({...curReservation, totalTimeOnExam: time * 60}))
    }

    const setOnlineExam = (online: boolean) => {
        dispatch(editCurReservation({...curReservation, onlineExam: online}))
    }

    const setPrivateRoom = (privateRoom: boolean) => {
        dispatch(editCurReservation({...curReservation, privateRoom: privateRoom}))
        setPrivateRoomFlag(privateRoom)
    }

    const setComputerNeeded = (computerNeeded: boolean) => {
        dispatch(editCurReservation({...curReservation, computerNeeded: computerNeeded}))
        setComputerNeededFlag(computerNeeded)
    }

    return {
        validRoom,
        setName,
        setExamName,
        setTotalTimeOnExam,
        setPrivateRoom,
        setComputerNeeded,
        setOnlineExam,
        curReservation,
        rooms,
    }
}
export default useResForm;