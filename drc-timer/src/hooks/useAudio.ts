import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AlarmState } from "../stores";
import { setTenMinAlarm, setTimesUpAlarm } from "../reducers/AlarmReducer";
// @ts-ignore
import alarm from "../Layout/TimerAlert/alarm.mp3";

function useAudioPlayer() {
    const dispatch = useDispatch();
    const { tenMinAlarm, timesUpAlarm } = useSelector((state:AlarmState) => state.alarmReducer);

    const [audio, setAudio] = useState(new Audio(alarm));

    useEffect(() => {
        if(tenMinAlarm || timesUpAlarm) {
            audio.loop = true;
            audio.play();
        } else {
            audio.pause();
            audio.currentTime = 0;
        }
    }, [tenMinAlarm, timesUpAlarm]);

    const handleTenMinAlarm = () => {
        dispatch(setTenMinAlarm(false));
    }
    const handleTimesUpAlarm = () => {
        dispatch(setTimesUpAlarm(false));
    }

    return {tenMinAlarm, timesUpAlarm, handleTenMinAlarm, handleTimesUpAlarm };
}

export default useAudioPlayer;