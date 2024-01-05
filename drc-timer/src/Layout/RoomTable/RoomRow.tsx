import { useEffect, useState } from "react";
import Room from "../../models/Room";
import Reservation from "../../models/Reservation";
import { formatTime } from "../../utils/formatTime";

export const RoomRow: React.FC<{ room: Room, moveResToQueue: any, updateAvailableRooms: any }> = (props) => {
    const [runTimer, setRunTimer] = useState(false)
    const [displayString, setDisplayString] = useState('room is empty')
    const [rowColor, setRowColor] = useState('')
    const [available, setAvailable] = useState(props.room.available)

    const updateRowColor = () => {
        if(!available){
            setRowColor('table-secondary')
            return
        }
        else if (props.room.reservation === undefined || props.room.reservation === null) {
            setRowColor('') //white
        }
        else if (!runTimer) {
            setRowColor('table-primary') //blue
        }

        else if (runTimer) {
            const reservation: Reservation = props.room.reservation
            const timeLeft: number = reservation.timeCheckSeconds()
            if (timeLeft > 600) {
                setRowColor('table-success')
            }
            else if (0 < timeLeft && timeLeft <= 600) {
                setRowColor('table-warning')
            }
            else if (timeLeft <= 0) {
                setRowColor('table-danger')
            }
        }
    }

    const updateTimer = () => {
        if (props.room.reservation !== null && props.room.reservation !== undefined) {
            const reservation: Reservation = props.room.reservation
            setDisplayString(formatTime(reservation.timeCheckSeconds()))
            return
        }
        setDisplayString('room is empty')

    }

    useEffect(() => {

        const interval = setInterval(() => updateTimer(), 500)

        return () => clearInterval(interval)
    })

    useEffect(() => {
        updateRowColor()
    }, [displayString, available, runTimer])

    function startStopClick() {
        if (props.room.reservation !== undefined && props.room.reservation !== null) {
            if (runTimer) {
                props.room.reservation.pauseTime()
            } else {
                props.room.reservation.startTimer()
            }
            setRunTimer(!runTimer)
        }

    }

    function emptyRoom(){
        props.room.reservation = null
        props.updateAvailableRooms()
        setRunTimer(false)
    }

    function changeRoomAvailability(){
        props.room.updateAvailability()
        setAvailable(!available)
        props.updateAvailableRooms()
    }

    function moveResToQueue(){
        if(props.room.reservation !== null && props.room.reservation !== undefined){
            props.room.reservation.pauseTime()
            setRunTimer(false)
            props.moveResToQueue(props.room.reservation)
            props.room.reservation = null
            props.updateAvailableRooms()
        }
    }

    return (
        <tr className={rowColor}>
            <th scope="row">
                {props.room.name}
            </th>
            <th>
                {props.room.reservation !== null ?
                    <>
                        {props.room.reservation.name}
                    </>
                    :
                    <></>}
            </th>
            <th>
                {props.room.reservation !== null ?
                    <>{props.room.reservation.examName}</> : <></>}
            </th>
            <th>
                {displayString}
            </th>
            <th>
                <button className={!runTimer ? "btn btn-primary" : "btn btn-danger"} onClick={() => startStopClick()}>{runTimer ? 'Stop' : 'Start'}</button>
            </th>
            <th>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Additional Actions
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#" onClick={()=>moveResToQueue()}>Return Exam To Queue</a></li>
                        <li><a className="dropdown-item" href="#" onClick={()=>emptyRoom()}>Finish Exam</a></li>
                        <li><a className="dropdown-item" href="#">Add Time To Exam (not implemented yet)</a></li>
                        <li><a className="dropdown-item" href="#" onClick={()=>changeRoomAvailability()}>{available? 'Mark Room As Unavailable': 'Mark Room as Available'}</a></li>
                    </ul>
                </div>
            </th>
        </tr>
    )
}