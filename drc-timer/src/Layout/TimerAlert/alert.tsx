import useAudioPlayer from "../../hooks/useAudio"

const Alert = () => {
    const { tenMinAlarm, timesUpAlarm, handleTenMinAlarm, handleTimesUpAlarm } = useAudioPlayer();

    return (
        <>{timesUpAlarm ?
            <div className="alert alert-danger" role="alert">
            Times Up!
            <button className="btn btn-primary" type="button" onClick={()=>handleTimesUpAlarm()}>Dismiss</button>
            </div>
            :
            <>{tenMinAlarm ?
                <div className="alert alert-warning" role="alert">
                Ten Minute Warning Needed!!
            <button className="btn btn-primary" type="button" onClick={()=>handleTenMinAlarm()}>Dismiss</button>
                </div>
                :
                <></>
            }</>
        }
        </>
    )
}

export default Alert;