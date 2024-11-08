import { createSlice } from "@reduxjs/toolkit";
import Reservation from "../models/Reservation";

interface ReservationState{
    reservations: Reservation[];
    reservationId: number;
}

const initialState: ReservationState = {
    reservations: [],
    reservationId: 1,
}

const reservationSlice = createSlice({
    name: 'reservations',
    initialState,
    reducers: {
        createReservation: (state, action) => {
            const newReservation: Reservation = {id:state.reservationId,
                name:action.payload.resName,
                examName: action.payload.examName, startTime: null,
                totalTimeOnExam: action.payload.examLength,
                privateRoom: action.payload.privateRoom,
                computerNeeded: action.payload.needsComputer,
                onlineExam: action.payload.isOnline,
                timeAdded: 0,
                tenMinWarningGiven: false,
                running: false,
                assigned: action.payload.isAssigned}
            state.reservationId = state.reservationId + 1
            state.reservations = [...state.reservations, newReservation]   
        },
        assignReservationToRoom: (state, action) => {
            const updatedReservations = state.reservations.map(res=> {
                if(res.id === action.payload.id){
                    return {...res, assigned: !res.assigned}
                }
                else{
                    return res
                }
            })
            state.reservations = updatedReservations
        },
        deleteExam: (state, action) => {
            const updatedReservations = state.reservations.filter(res=>res.id!== action.payload.id)
            state.reservations = updatedReservations
        },
        addTimeToExam: (state, action) => {
            const updatedReservations = state.reservations.map(res=>{
                if(res.id===action.payload.id){
                    return {...res, totalTimeOnExam: res.totalTimeOnExam + action.payload.timeToAdd}
                }
                else {
                    return res
                }
            })
            state.reservations = updatedReservations
        },
        startOrStopTimer: (state, action) => {
            const updatedReservations = state.reservations.map(res=> {
                if(res.id === action.payload.id){
                    return {...res, running: !res.running}
                }else{
                    return res
                }
            })
            state.reservations = updatedReservations
        },
        updateUnseatedReservation: (state, action) => {
            const updatedUnseated = state.reservations.map(res=>{
                if(res.id === action.payload.id){
                    return action.payload
                } else{
                    return res
                }
            })
            state.reservations = updatedUnseated
        },
        updateSeatedReservation: (state, action) => {

            const updatedSeated = state.reservations.map(res=> {
                if(res.id === action.payload.id){
                    return action.payload
                } else {
                    return res
                }
            })
            state.reservations = updatedSeated
        }
    }
})

export const {createReservation, assignReservationToRoom,
deleteExam, addTimeToExam, startOrStopTimer, updateSeatedReservation, updateUnseatedReservation} = reservationSlice.actions
export default reservationSlice.reducer