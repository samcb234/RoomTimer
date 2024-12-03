import { createSlice } from "@reduxjs/toolkit";
import Reservation from "../models/Reservation";

interface ReservationState{
    reservations: Reservation[];
    reservationId: number;
    curReservation: Reservation;
    resAction: 'save' | 'edit';
    timeInput: 'button' | 'textbox';
}

const initialState: ReservationState = {
    reservations: [],
    reservationId: 1,
    curReservation: {id:0, name:'', examName:'', startTime:null, totalTimeOnExam:0, privateRoom:false, computerNeeded:false, onlineExam:false, timeAdded:0, tenMinWarningGiven:false, running:false, assigned:false},
    resAction: 'save',
    timeInput: 'textbox'
}

const reservationSlice = createSlice({
    name: 'reservations',
    initialState,
    reducers: {
        actOnReservation: (state) => {
            if(state.resAction === 'save'){
                state.reservations = [...state.reservations, {...state.curReservation, id: state.reservationId}]
                state.reservationId = state.reservationId + 1
                // state.curReservation = {id:0, name:'', examName:'', startTime:null, totalTimeOnExam:0, privateRoom:false, computerNeeded:false, onlineExam:false, timeAdded:0, tenMinWarningGiven:false, running:false, assigned:false}
            }
            else if(state.resAction === 'edit'){
                const updatedReservations = state.reservations.map(res=> {
                    if(res.id === state.curReservation.id){
                        return state.curReservation
                    } else {
                        return res
                    }
                })
                state.reservations = updatedReservations
                // state.curReservation = {id:0, name:'', examName:'', startTime:null, totalTimeOnExam:0, privateRoom:false, computerNeeded:false, onlineExam:false, timeAdded:0, tenMinWarningGiven:false, running:false, assigned:false}
            }
        },
        setCurReservation: (state, action)=> {
            const res = state.reservations.find(res=>res.id === action.payload.id)
            if(res){
                state.curReservation = res
                state.resAction = action.payload.resAction
                state.timeInput = action.payload.timeInput
            } else {
                state.curReservation = {id:0, name:'', examName:'', startTime:null, totalTimeOnExam:0, privateRoom:false, computerNeeded:false, onlineExam:false, timeAdded:0, tenMinWarningGiven:false, running:false, assigned:false}
                state.resAction = 'save'
            }
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
        },
        editCurReservation: (state, action) => {
            state.curReservation = action.payload
        }
    }
})

export const {actOnReservation, setCurReservation, assignReservationToRoom,
deleteExam, addTimeToExam, startOrStopTimer, updateSeatedReservation, updateUnseatedReservation, editCurReservation} = reservationSlice.actions
export default reservationSlice.reducer