import { useEffect, useState } from "react";
import Room from "../../models/Room";
import Reservation from "../../models/Reservation";
import { formatTime } from "../../utils/formatTime";

export const RoomRow: React.FC<{room: Room}> = (props) =>{
    const [runTimer, setRunTimer] = useState(false)
    const [displayString, setDisplayString] = useState('room is empty')
    const [rowColor, setRowColor] = useState('')

    const updateRowColor = ()=> {
        if(props.room.reservation === undefined || props.room.reservation === null){
            setRowColor('') //white
        }
        else if(!runTimer){
            setRowColor('table-primary') //blue
        }

        else if(runTimer){
            const reservation: Reservation = props.room.reservation
            const timeLeft: number = reservation.timeCheckSeconds()
            if(timeLeft > 600){
                setRowColor('table-success')
            }
            else if(0 < timeLeft && timeLeft <= 600){
                setRowColor('table-warning')
            }
            else if(timeLeft <= 0){
                setRowColor('table-danger')
            }
        }
    }

    const updateTimer = () => {
        if(props.room.reservation !== null && props.room.reservation !== undefined){
            const reservation: Reservation = props.room.reservation
            setDisplayString(formatTime(reservation.timeCheckSeconds()))
            return
        }
        setDisplayString('room is empty')
        
    }

    useEffect(() => {

        const interval = setInterval(() => updateTimer(), 1000)

        return ()=> clearInterval(interval)
    })

    useEffect(() => {
        updateRowColor()
    }, [displayString])

    function startStopClick(){
        if(props.room.reservation !== undefined && props.room.reservation !== null){
            if(runTimer){
                props.room.reservation.pauseTime()
            } else {
                props.room.reservation.startTimer()
            }
            setRunTimer(!runTimer)
        }

    }

    return(
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
                <button className={!runTimer? "btn btn-primary":"btn btn-danger"} onClick={()=>startStopClick()}>{runTimer ? 'Stop' : 'Start'}</button>
            </th>
        </tr>
    )
}