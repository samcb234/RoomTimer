import { createSlice } from "@reduxjs/toolkit";
import Reservation from "../models/Reservation";

interface ReservationState{
    unseatedReservations: Reservation[];
    seatedReservations: Reservation[];
    reservationId: number;
}

const initialState: ReservationState = {
    unseatedReservations: [],
    seatedReservations: [],
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
                running: false}
            if(action.payload.isAssigned){
                state.seatedReservations = [...state.seatedReservations, newReservation]
            } else {
                state.unseatedReservations = [...state.unseatedReservations, newReservation]
            }
            state.reservationId += 1
        },
        assignReservationToRoom: (state, action) => {
            const reservation = state.unseatedReservations.find(res => res.id === action.payload.id)
            if(reservation !== undefined){
                const newUnseated = state.unseatedReservations.filter(res => res.id !== action.payload.id)
                state.seatedReservations = [...state.seatedReservations, reservation]
                state.unseatedReservations = newUnseated
            }
        },
        returnReservationToUnseated: (state, action)=> {
            const reservation = state.seatedReservations.find(res => res.id === action.payload.id)
            if(reservation !== undefined) {
                const newSeated = state.seatedReservations.filter(res => res !== action.payload.id)
                state.unseatedReservations = [...state.unseatedReservations, {...reservation, running:false}]
                state.seatedReservations = newSeated
            }
        },
        deleteExam: (state, action) => {
            const updatedUnSeated = state.unseatedReservations.filter(
                res => res.id !== action.payload.id
            )
            const updatedSeated = state.seatedReservations.filter(
                res=> res.id !== action.payload.id
            )
            state.unseatedReservations = updatedUnSeated
            state.seatedReservations = updatedSeated
        },
        addTimeToExam: (state, action) => {
            const updatedUnseated = state.unseatedReservations.map(res=>{
                if(res.id !== action.payload.id){
                    return res
                } else{
                    return {...res, timeAdded: res.timeAdded + action.payload.time, totalTimeOnExam: res.totalTimeOnExam + action.payload.time}
                }
            })
            const updateSeated = state.seatedReservations.map(res=>{
                if(res.id !== action.payload.id){
                    return res
                } else{
                    return {...res, timeAdded: res.timeAdded + action.payload.time, totalTimeOnExam: res.totalTimeOnExam + action.payload.time}
                }
            })
            state.unseatedReservations = updatedUnseated
            state.seatedReservations = updateSeated
        },
        startOrStopTimer: (state, action) => {
            const updatedReservations = state.seatedReservations.map(res=> {
                if(res.id === action.payload.id){
                    return {...res, running: !res.running}
                }else{
                    return res
                }
            })
            state.seatedReservations = updatedReservations
        },
        updateUnseatedReservation: (state, action) => {
            const updatedUnseated = state.unseatedReservations.map(res=>{
                if(res.id === action.payload.id){
                    return action.payload
                } else{
                    return res
                }
            })
            state.unseatedReservations = updatedUnseated
        },
        updateSeatedReservation: (state, action) => {

            const updatedSeated = state.seatedReservations.map(res=> {
                if(res.id === action.payload.id){
                    return action.payload
                } else {
                    return res
                }
            })
            state.seatedReservations = updatedSeated
        }
    }
})

export const {createReservation, assignReservationToRoom, returnReservationToUnseated,
deleteExam, addTimeToExam, startOrStopTimer, updateSeatedReservation, updateUnseatedReservation} = reservationSlice.actions
export default reservationSlice.reducer