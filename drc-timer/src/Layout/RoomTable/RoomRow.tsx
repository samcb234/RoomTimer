import { useEffect, useState } from "react";
import Room from "../../models/Room";
import Reservation from "../../models/Reservation";
import { useDispatch, useSelector } from "react-redux";
import { ReservationState } from "../../stores";
import { deleteExam, editCurReservation, setCurReservation, updateSeatedReservation } from "../../reducers/ReservationReducer";
import { setReservationToNull, updateRoomAvailability } from "../../reducers/RoomReducer";
import { Clock } from "../../utils/clock";
import { formatTime } from "../../utils/formatTime";
import { setTenMinAlarm, setTimesUpAlarm } from "../../reducers/AlarmReducer";

type buttonPresets = {
    message: string;
    color: string;
}

const presets = {
    "running": { message: "Pause", color: "danger" },
    "stopped": { message: "Start", color: "success" },
    "10min": { message: "Give 10 Min Warning", color: "warning" }
}

export const RoomRow: React.FC<{
    room: Room, useTable: boolean, clock: Clock, filter: string, searchString: string,
    searchFilter: string
}> = (props) => {
    const dispatch = useDispatch()
    const { reservations } = useSelector((state: ReservationState) => state.reservationReducer)
    const [reservation, setReservation] = useState<Reservation | null>()

    const [rowColor, setRowColor] = useState<string>('primary')
    const [displayString, setDisplayString] = useState<string>('empty')
    const [buttonColorString, setButtonColorString] = useState<string>('success')
    const [buttonString, setButtonString] = useState<string>('Start')

    const [displayRow, setDisplayRow] = useState<boolean>(true)

    const checkSearch = () => {
        if (reservation) {
            switch (props.searchFilter) {
                case 'student': {
                    return reservation.name.toLowerCase().includes(props.searchString.toLowerCase())
                }
                case 'class': {
                    return reservation.examName.toLowerCase().includes(props.searchString.toLowerCase())
                }
                // case 'professor': {
                //     return reservation.professor.toLowerCase().includes(props.searchString.toLowerCase())
                // }
                default: {
                    return false
                }
            }
        } else {
            return props.searchString === ''
        }
    }

    useEffect(() => {
        switch (props.filter) {
            case 'all': {
                setDisplayRow(checkSearch())
                break
            }
            case 'open': {
                setDisplayRow(props.room.reservation === -1 && props.room.available && checkSearch())
                break
            }
            case 'running': {
                if (reservation) {
                    setDisplayRow(reservation.running && checkSearch())
                } else {
                    setDisplayRow(false)
                }
                break
            }
            case 'under 10': {
                if (reservation) {
                    setDisplayRow(0 < reservation.totalTimeOnExam && reservation.totalTimeOnExam <= 600 && checkSearch())
                } else {
                    setDisplayRow(false)
                }
                break
            }
            case 'times up': {
                if (reservation) {
                    setDisplayRow(reservation.totalTimeOnExam <= 0 && checkSearch())
                } else {
                    setDisplayRow(false)
                }
                break
            }
            default: {
                if (reservation) {
                    setDisplayRow(checkSearch())
                } else {
                    setDisplayRow(false)
                }
            }
        }
    }, [props.filter, props.searchFilter, props.searchString, props.room, reservation])

    const clock = props.clock

    const tick = () => {
        setReservation(prevRes =>
            prevRes ?
                {
                    ...prevRes, totalTimeOnExam: prevRes.running && (prevRes.totalTimeOnExam > 600 || prevRes.tenMinWarningGiven) ? prevRes.totalTimeOnExam - 1 : prevRes.totalTimeOnExam,
                    running: (prevRes.totalTimeOnExam <= 600) && !prevRes.tenMinWarningGiven ? false : prevRes.running, startTime: prevRes.running ? new Date() : prevRes.startTime
                }
                :
                prevRes)
    }

    useEffect(() => {
        const listener = () => { tick() }
        clock.addListener(listener)
        return () => {
            clock.removeListener(listener)
        }
    }, [])

    useEffect(() => {
        const newRes = reservations.find(res => res.id === props.room.reservation && res.assigned)
        const d = new Date()
        const updatedReservation = newRes ?
            {
                ...newRes,
                totalTimeOnExam: newRes.running && newRes.startTime ?
                    newRes.totalTimeOnExam - Math.abs((newRes.startTime.getTime() - d.getTime()) / 1000)
                    : newRes.totalTimeOnExam
            }
            : newRes
        setReservation(updatedReservation)
        return () => {
            if (reservation) {
                dispatch(updateSeatedReservation({ ...reservation }))
            }
        }
    }, [props.room])

    useEffect(()=>{

        const newRes = reservations.find(res => res.id === props.room.reservation && res.assigned)
        const d = new Date()
        const updatedReservation = newRes ?
            {
                ...newRes,
                totalTimeOnExam: newRes.running && newRes.startTime ?
                    newRes.totalTimeOnExam - Math.abs((newRes.startTime.getTime() - d.getTime()) / 1000)
                    : newRes.totalTimeOnExam
            }
            : newRes
        setReservation(updatedReservation)
    }, [reservations])

    const startStopClick = () => {
        setReservation(prevRes =>
            prevRes ?
                {
                    ...prevRes, running: !prevRes.running,
                    startTime: !prevRes.running ? new Date() : prevRes.startTime,
                    tenMinWarningGiven: (!prevRes.running && prevRes.totalTimeOnExam <= 600 && !prevRes.tenMinWarningGiven) ? true : prevRes.tenMinWarningGiven
                }
                : prevRes)
    }

    const moveResToQueue = () => {
        if (reservation) {
            dispatch(updateSeatedReservation({ ...reservation, assigned: false, running: false }))
            dispatch(setReservationToNull({ name: props.room.name }))
        }
    }

    const emptyRoom = () => {
        if (reservation) {
            dispatch(deleteExam({ id: reservation.id }))
            dispatch(setReservationToNull({ name: props.room.name }))
        }
    }

    const addTime = (timeToAdd: number) => {
        setReservation(prevRes =>
            prevRes ? { ...prevRes, totalTimeOnExam: prevRes.totalTimeOnExam + timeToAdd } : prevRes)
    }

    const changeRoomAvailability = () => {
        dispatch(updateRoomAvailability({ name: props.room.name }))
    }

    useEffect(() => {
        const handleReservationDisplay = () => {
            if (reservation) {
                if (reservation.onlineExam) {
                    setDisplayString('Online')
                } else {
                    setDisplayString(formatTime(reservation.totalTimeOnExam))
                }
            } else {
                setDisplayString('empty')
            }
        }
        const handleButtonChange = (preset: buttonPresets) => {
            setButtonColorString(preset['color'])
            setButtonString(preset['message'])
        }
        const handleStartStopButton = () => {
            if (reservation) {
                if (reservation.onlineExam || reservation.totalTimeOnExam > 600) {
                    handleButtonChange(reservation.running ? presets['running'] : presets['stopped'])
                    setRowColor(reservation.running ? 'success' : 'primary')
                } else if (reservation.running && reservation.totalTimeOnExam === 600 && !reservation.tenMinWarningGiven) {
                    handleButtonChange(presets['10min'])
                    setRowColor('warning')
                    dispatch(setTenMinAlarm(true))
                } else if ((0 < reservation.totalTimeOnExam && reservation.totalTimeOnExam <= 600) && reservation.tenMinWarningGiven) {
                    handleButtonChange(reservation.running ? presets['running'] : presets['stopped'])
                    setRowColor('warning')
                } else if (reservation.totalTimeOnExam === 0) {
                    handleButtonChange(reservation.running ? presets['running'] : presets['stopped'])
                    setRowColor('danger')
                    dispatch(setTimesUpAlarm(true))
                } else if (reservation.totalTimeOnExam < 0) {
                    handleButtonChange(reservation.running ? presets['running'] : presets['stopped'])
                    setRowColor('danger')
                }
            } else if (!props.room.available) {
                handleButtonChange(presets['stopped'])
                setRowColor('secondary')
            }
            else {
                handleButtonChange(presets['stopped'])
                setRowColor('')
            }
        }
        handleStartStopButton()
        handleReservationDisplay()
    }, [reservation, props.room.available])

    const setModal = () => {
        if(reservation){
            dispatch(updateSeatedReservation(reservation))
            dispatch(setCurReservation({id: reservation.id, resAction: 'edit'}))
        }
    }

    return (
        <>{displayRow ?
            <>
                {props.useTable ?
                    <tr className={`table-${rowColor}`}>
                        <th scope="row">
                            {props.room.name}
                        </th>
                        <th>
                            {reservation ?
                                <>
                                    {reservation.name}
                                </>
                                :
                                <></>}
                        </th>
                        <th>
                            {reservation ?
                                <>{reservation.examName}</> : <></>}
                        </th>
                        <th>
                            {displayString}
                        </th>
                        <th>
                            {reservation ?
                                <>{reservation.tenMinWarningGiven ?
                                    <>Given</>
                                    :
                                    <>Not Given</>}
                                </> :
                                <></>}
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
                                    <li>
                                        <button onClick={()=> setModal()} type="button" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        Edit
                                        </button>
                                    </li>
                                    <li><a className="dropdown-item" href="#" onClick={() => emptyRoom()}>Finish Exam</a></li>
                                    <li><a className="dropdown-item" href="#" onClick={() => addTime(600)}>Add Time To Exam</a></li>
                                    <li><a className="dropdown-item" href="#" onClick={() => changeRoomAvailability()}>{props.room.available ? 'Mark Room As Unavailable' : 'Mark Room as Available'}</a></li>
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
                                    <>{reservation ?
                                        <h4>{`${reservation.name} - ${reservation.examName}`}</h4>
                                        :
                                        <></>}</>
                                    <h4>{displayString}</h4>
                                </div>
                                <button className={!reservation?.running ? "btn btn-success" : "btn btn-danger"} onClick={() => startStopClick()}>{reservation?.running ? 'Stop' : 'Start'}</button>

                                <div className="dropdown mt-1">
                                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Menu
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="#" onClick={() => moveResToQueue()}>Return Exam To Queue</a></li>
                                        <li><a className="dropdown-item" href="#" onClick={() => emptyRoom()}>Finish Exam</a></li>
                                        <li><a className="dropdown-item" href="#" onClick={() => addTime(600)}>Add Time To Exam</a></li>
                                        <li><a className="dropdown-item" href="#" onClick={() => changeRoomAvailability()}>{props.room.available ? 'Mark Room As Unavailable' : 'Mark Room as Available'}</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </>
            :
            <></>}
            </>
    )
}