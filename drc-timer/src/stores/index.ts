import { configureStore } from "@reduxjs/toolkit"
import Room from "../models/Room"
import roomReducer from '../reducers/RoomReducer'
import Reservation from "../models/Reservation"
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
    }
}

const store = configureStore({
    reducer:{
        roomReducer,
        reservationReducer
    },
    middleware: getDefaultMiddleware=> getDefaultMiddleware({serializableCheck: false})
})
export default store