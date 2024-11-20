import { useEffect, useState } from "react"
import { ReservationTable } from "../ReservationTable/ReservationTable"
import { RoomTable } from "../RoomTable/RoomTable"
import Reservation from "../../models/Reservation"
import Room from "../../models/Room"
import { AddResForm } from "../AddResForm/AddResForm"
import { useDispatch } from "react-redux"
import Alert from "../TimerAlert/alert"

export const Homepage = () => {

  document.title = 'DRC Exam Timer'

  window.addEventListener('beforeunload', function (e: any) {
    console.log('here')
    e.preventDefault()
    e.returnValue = ''
  })

  return (
  <>
  <Alert/>
    <div className='row'>
      <div className='col'>
        <RoomTable />
      </div>
      <div className='col'>
        <AddResForm  />
        <ReservationTable />
      </div>
    </div>
  </>
  )
}