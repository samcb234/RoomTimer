import {createSlice} from "@reduxjs/toolkit"
import Room from "../models/Room";
import { templateList } from "../utils/Data/RoomData";


interface RoomState {
    rooms: Room[];
}

const initialState: RoomState = {
    rooms: templateList.map((template) => new Room(template.name, -1, template.privateRoom, template.hasComputer, true))
}

const roomSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        addReservationToRoom: (state, action) => {
            const room = state.rooms.find(r=> {
                const validRoom = r.reservation === -1 && !(action.payload.privateRoom && !r.privateRoom)
                && !(action.payload.needsComputer && !r.hasComputer)
                return action.payload.random ? validRoom : validRoom && r.name === action.payload.roomName
            })
            if(room){
                state.rooms = state.rooms.map(r=> {
                    if(r.name === room.name){
                        return {...room, reservation: action.payload.reservation}
                    } else {
                        return r
                    }
                })
            }
        },
        setReservationToNull: (state, action) => {
            const updatedRooms = state.rooms.map(room => {
                if(room.name === action.payload.name){
                    return {...room, reservation: -1}
                } else{
                    return room
                }
            })
            state.rooms = updatedRooms
        },
        updateRoomAvailability: (state, action) => {
            const updatedRooms = state.rooms.map(room => {
                if(room.name === action.payload.name){
                    return{...room, available: !room.available}
                } else {
                    return room
                }
            })
            state.rooms = updatedRooms
        }
    }
})
export const {addReservationToRoom, setReservationToNull, updateRoomAvailability} = roomSlice.actions
export default roomSlice.reducer