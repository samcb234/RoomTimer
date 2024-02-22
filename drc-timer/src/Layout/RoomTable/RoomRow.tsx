import { useEffect, useState } from "react";
import Room from "../../models/Room";
import Reservation from "../../models/Reservation";

type buttonPresets = {
    message: string;
    color: string;
}

const presets = {"running": {message: "Pause", color: "danger"},
"stopped": {message: "Start", color: "success"},
"10min": {message: "Give 10 Min Warning", color: "warning"}}

export const RoomRow: React.FC<{ room: Room, moveResToQueue: any, updateAvailableRooms: any, useTable: boolean, completedRoom: any }> = (props) => {
    const [runTimer, setRunTimer] = useState(props.room.runningTimer)
    const [displayString, setDisplayString] = useState('empty')
    const [rowColor, setRowColor] = useState('primary')
    const [available, setAvailable] = useState(props.room.available)

    const [buttonString, setButtonString] = useState('Start')
    const [buttonColorString, setButtonColorString] = useState('success')

    const updateButton = (preset: buttonPresets)=> {
        setButtonString(preset.message)
        setButtonColorString(preset.color)
    }

    const updateRow = () => {
        setRunTimer(props.room.runningTimer)
        if (!props.room.available) { //room isn't being used for exams 
            setRowColor('secondary')
            return
        }
        else if (props.room.reservation === null || props.room.reservation === undefined) { //no reservation in room
            setRowColor('primary')
            setDisplayString('empty')
            props.room.runningTimer = false
            updateButton(presets.stopped)
            return
        }
        else { //there is an exam in the room
            const res: Reservation = props.room.reservation
            if (res.onlineExam) {//online exam
                setDisplayString('Online')
            } else { //display time remaining
                setDisplayString(res.timeCheckString())
            }
            if (!runTimer) { //timer not running
                const timeLeft = res.timeCheckSeconds()
                if((0 < timeLeft && timeLeft < 600) && !res.tenMinWarningGiven){
                    setRowColor('warning')
                    updateButton(presets["10min"])
                    return
                }
                else{
                    setRowColor('')
                    return
                }
            }
            else if (res.timeCheckSeconds() >= 600) {// more than 10 min left
                setRowColor('success')
                updateButton(presets.running)
                return
            }
            else if (res.timeCheckSeconds() < 600 && res.timeCheckSeconds() > 0) {//inside 10 min warning
                setRowColor('warning')
                if (!res.tenMinWarningGiven) {
                    res.pauseTime()
                    props.room.runningTimer = false
                    setRunTimer(false)
                    updateButton(presets["10min"])
                }
                else{
                    updateButton(presets.running)
                }
                return
            }
            else if (res.timeCheckSeconds() <= 0) {
                setRowColor('danger')
                return
            }
        }
    }

    useEffect(() => {

        const interval = setInterval(() => updateRow(), 100)

        return () => clearInterval(interval)
    })



    function startStopClick() {
        if (props.room.reservation !== undefined && props.room.reservation !== null) {
            if (runTimer) {
                props.room.reservation.pauseTime()
                updateButton(presets.stopped)
            } else {
                props.room.reservation.startTimer()
                updateButton(presets.running)
                if (!props.room.reservation.tenMinWarningGiven && props.room.reservation.timeCheckSeconds() <= 600) {
                    props.room.reservation.tenMinWarningGiven = true
                }
            }
            props.room.runningTimer = !runTimer
            setRunTimer(!runTimer)
        }

    }

    function emptyRoom() {
        props.room.reservation = null
        props.room.runningTimer = false
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

    function addTime(timeToAdd: number) {
        if (props.room.reservation !== null && props.room.reservation !== null) {
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
                        {props.room.reservation === null || props.room.reservation === undefined ?
                            <></>
                            :
                            <>{props.room.reservation.tenMinWarningGiven ?
                                <>Given</>
                                :
                                <>Not Given</>}
                            </>}
                    </th>
                    <th>
                        <button className={`btn btn-${buttonColorString}`} onClick={() => startStopClick()}>{buttonString}</button>

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