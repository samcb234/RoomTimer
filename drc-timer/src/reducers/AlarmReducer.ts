import { createSlice } from "@reduxjs/toolkit";

interface AlarmState {
    tenMinAlarm: boolean;
    timesUpAlarm: boolean;
}

const initialState: AlarmState = {
    tenMinAlarm: false,
    timesUpAlarm: false
}

const alarmSlice = createSlice({
    name: 'alarms',
    initialState,
    reducers: {
        setTenMinAlarm: (state, action) => {
            state.tenMinAlarm = action.payload
        },
        setTimesUpAlarm: (state, action) => {
            state.timesUpAlarm = action.payload
        }
    }
})
export const { setTenMinAlarm, setTimesUpAlarm } = alarmSlice.actions
export default alarmSlice.reducer