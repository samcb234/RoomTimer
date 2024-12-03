import { useEffect, useState } from "react"
import { ReservationTable } from "../ReservationTable/ReservationTable"
import { RoomTable } from "../RoomTable/RoomTable"
import Reservation from "../../models/Reservation"
import Room from "../../models/Room"
import { useDispatch, useSelector } from "react-redux"
import Alert from "../TimerAlert/alert"
import { actOnReservation, assignReservationToRoom, editCurReservation, setCurReservation} from "../../reducers/ReservationReducer"
import { ReservationState } from "../../stores"
import { addReservationToRoom } from "../../reducers/RoomReducer"
import AddOrEditModal from "../AddResForm/AddOrEditModal"
import useFileParser from "../../hooks/reservationSheetParser"

export const Homepage = () => {
  const dispatch = useDispatch()
  const {reservationSheetParser} = useFileParser()
  const {reservationId, resAction, curReservation} = useSelector((state: ReservationState)=> state.reservationReducer)
  const [resFile, setResFile] = useState<File>()
  document.title = 'DAS Exam Timer'

  window.addEventListener('beforeunload', function (e: any) {
    console.log('here')
    e.preventDefault()
    e.returnValue = ''
  })

  const assignResToRoom = (res: Reservation, roomName: string) => {
    const id = resAction === 'save' ? reservationId : curReservation.id
    dispatch(actOnReservation())
    dispatch(assignReservationToRoom({id: id}))
    dispatch(addReservationToRoom({random: false, needsComputer: res.computerNeeded, privateRoom: res.privateRoom, reservation: id, roomName: roomName}))
  }

  const setModal = () => {
    dispatch(setCurReservation({id: reservationId, resAction: 'save', timeInput: 'textbox'}))
    dispatch(editCurReservation({name: '', examName: '', totalTimeOnExam: 0, privateRoom: false, computerNeeded: false}))
  }

  const handleFile = (files: any)=> {
    if(!files){
      return
    }
    setResFile(files[0])
  }

  useEffect(()=> {
    if(resFile){
      reservationSheetParser(resFile)
    }
  },[resFile])
  return (
    <>
      <Alert />
      <div className='row'>
        <div className='col'>
          <RoomTable />
        </div>
        <div className='col'>
          <div className="row">
            <div className="col">
              <input type='file' accept=".xlsx" multiple={false} onChange={(e)=> handleFile(e.target.files)}/>
            </div>
            <div className="col">
          <button onClick={()=>setModal()} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Add Reservation
          </button>
            </div>
          </div>
          <ReservationTable />
        </div>
      </div>

      <AddOrEditModal assignAction={assignResToRoom}/>
    </>
  )
}