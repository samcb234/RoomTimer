import { useEffect, useState } from "react";
import Room from "../../models/Room";
import Reservation from "../../models/Reservation";

export const RoomRow: React.FC<{ room: Room, moveResToQueue: any, updateAvailableRooms: any, useTable: boolean, completedRoom: any}> = (props) => {
    const [runTimer, setRunTimer] = useState(props.room.runningTimer)
    const [displayString, setDisplayString] = useState('empty')
    const [rowColor, setRowColor] = useState('primary')
    const [available, setAvailable] = useState(props.room.available)

    const updateRow = () => {
        setRunTimer(props.room.runningTimer)
        if(!props.room.available){
            setRowColor('secondary')
            return
        }
        else if(props.room.reservation === null || props.room.reservation === undefined){ //no reservation in room
            setRowColor('primary')
            setDisplayString('empty')
            return
        }
        else {
            const res: Reservation = props.room.reservation
            if(res.onlineExam){
                setDisplayString('Online')
            }else{
                setDisplayString(res.timeCheckString())
            }
            if(!runTimer){ //timer not running
                setRowColor('')
                return
            }
            else if(res.timeCheckSeconds() >= 600){
                setRowColor('success')
                return
            }
            else if(res.timeCheckSeconds() < 600 && res.timeCheckSeconds() > 0){
                setRowColor('warning')
                return
            }
            else if(res.timeCheckSeconds() <= 0){
                setRowColor('danger')
                return
            }
        }
    }

    useEffect(() => {

        const interval = setInterval(() => updateRow(), 250)

        return () => clearInterval(interval)
    })

    function startStopClick() {
        if (props.room.reservation !== undefined && props.room.reservation !== null) {
            if (runTimer) {
                props.room.reservation.pauseTime()
            } else {
                props.room.reservation.startTimer()
            }
            props.room.runningTimer = !runTimer
            setRunTimer(!runTimer)
        }

    }

    function emptyRoom() {
        props.room.reservation = null
        props.updateAvailableRooms()
        setRunTimer(false)
    }

    function changeRoomAvailability() {
        props.room.updateAvailability()
        setAvailable(!available)
        props.updateAvailableRooms()
    }

    function moveResToQueue() {
        if (props.room.reservation !== null && props.room.reservation !== undefined) {
            props.room.reservation.pauseTime()
            setRunTimer(false)
            props.moveResToQueue(props.room.reservation)
            props.room.reservation = null
            props.updateAvailableRooms()
        }
    }

    function addTime(timeToAdd: number){
        if(props.room.reservation !== null && props.room.reservation !== null){
            props.room.reservation.addTime(timeToAdd)
        }
    }

    return (
        <>
            {props.useTable ?
                <tr className={`table-${rowColor}`}>
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
                        {props.room.reservation?.timeAdded === 0 || props.room.reservation === undefined || props.room.reservation === null ? 
                        <></> : <>{props.room.reservation.timeAdded / 60}</>}
                    </th>
                    <th>
                        <button className={!runTimer ? "btn btn-success" : "btn btn-danger"} onClick={() => startStopClick()}>{runTimer ? 'Stop' : 'Start'}</button>

                    </th>
                    <th>
                        <div className="dropdown mt-1">
                            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Menu
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#" onClick={() => moveResToQueue()}>Return Exam To Queue</a></li>
                                <li><a className="dropdown-item" href="#" onClick={() => emptyRoom()}>Finish Exam</a></li>
                                <li><a className="dropdown-item" href="#" onClick={() => addTime(600)}>Add Time To Exam</a></li>
                                <li><a className="dropdown-item" href="#" onClick={() => changeRoomAvailability()}>{available ? 'Mark Room As Unavailable' : 'Mark Room as Available'}</a></li>
                            </ul>
                        </div>
                    </th>
                </tr>
                :
                <div className="col col-3 mb-2">
                    <div className={`card text-bg-${rowColor}`}>
                        <div className="card-body">
                            <div>
                                <h3>{props.room.name}</h3>
                                <>{props.room.reservation !== null && props.room.reservation !== undefined ?
                                    <h4>{`${props.room.reservation?.name} - ${props.room.reservation?.examName}`}</h4>
                                    :
                                    <></>}</>
                                <h4>{displayString}</h4>
                            </div>
                            <button className={!runTimer ? "btn btn-success" : "btn btn-danger"} onClick={() => startStopClick()}>{runTimer ? 'Stop' : 'Start'}</button>

                            <div className="dropdown mt-1">
                                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Menu
                                </button>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#" onClick={() => moveResToQueue()}>Return Exam To Queue</a></li>
                                    <li><a className="dropdown-item" href="#" onClick={() => emptyRoom()}>Finish Exam</a></li>
                                    <li><a className="dropdown-item" href="#" onClick={() => addTime(600)}>Add Time To Exam</a></li>
                                    <li><a className="dropdown-item" href="#" onClick={() => changeRoomAvailability()}>{available ? 'Mark Room As Unavailable' : 'Mark Room as Available'}</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}