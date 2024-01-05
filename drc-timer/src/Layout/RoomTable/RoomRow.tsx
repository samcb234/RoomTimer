import { useEffect, useState } from "react";
import Room from "../../models/Room";

export const RoomRow: React.FC<{room: Room}> = (props) =>{
    const [runTimer, setRunTimer] = useState(false)
    const [displayString, setDisplayString] = useState('room is empty')

    useEffect(() => {

        const updateTimer = () => {
            if(props.room.reservation !== null && props.room.reservation !== undefined){
                setDisplayString(props.room.reservation.timeCheck())
                return
            }
            setDisplayString('room is empty')
            
        }

        const interval = setInterval(() => updateTimer(), 1000)

        return ()=> clearInterval(interval)
    })

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
        <tr>
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