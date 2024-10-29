import { useEffect, useState } from "react"
import { ReservationTable } from "../ReservationTable/ReservationTable"
import { RoomTable } from "../RoomTable/RoomTable"
import Reservation from "../../models/Reservation"
import Room from "../../models/Room"
import { AddResForm } from "../AddResForm/AddResForm"
import { useDispatch } from "react-redux"

export const Homepage = () => {

  function resFilter(name: string, examName: string, res: Reservation) {
    return (name !== res.name) || (examName !== res.examName)
  }



  // function startRoomUpdate(){
  //     setUpdateAvailableRooms(!updateAvailableRooms)
  // }

  document.title = 'DRC Exam Timer'

  window.addEventListener('beforeunload', function (e: any) {
    console.log('here')
    e.preventDefault()
    e.returnValue = ''
  })

  return (
    <div className='row'>
      <div className='col'>
        <RoomTable />
      </div>
      <div className='col'>
        <AddResForm addDirectToRandomRoom={() => console.log('fucker')} />
        <ReservationTable />
      </div>
    </div>
  )
}