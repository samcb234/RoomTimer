import { configureStore } from "@reduxjs/toolkit"
import Room from "../models/Room"
import roomReducer from '../reducers/RoomReducer'
import Reservation from "../models/Reservation"
import alarmReducer from "../reducers/AlarmReducer"
import reservationReducer from "../reducers/ReservationReducer"

export interface RoomState {
    roomReducer: {
        rooms: Room[]
    }
}

export interface ReservationState {
    reservationReducer: {
        reservations: Reservation[]
        reservationId: number
        curReservation: Reservation
        resAction: 'save' | 'edit'
    }
}
export interface AlarmState {
    alarmReducer: {
        tenMinAlarm: boolean
        timesUpAlarm: boolean
    }
}

const store = configureStore({
    reducer:{
        roomReducer,
        reservationReducer,
        alarmReducer,

    },
    middleware: getDefaultMiddleware=> getDefaultMiddleware({serializableCheck: false})
})
export default store