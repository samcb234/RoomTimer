import * as XLSX from 'xlsx'
import Reservation from '../models/Reservation'
import { useDispatch } from 'react-redux'
import { actOnReservation, editCurReservation, setCurReservation } from '../reducers/ReservationReducer'

function useFileParser() {

  const dispatch = useDispatch()
  const reservationSheetParser = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const data = e.target?.result
      const workbook = XLSX.read(data, { type: 'binary' })
      const sheetName = workbook.SheetNames[0]
      const sheet = workbook.Sheets[sheetName]
      const parsedSheet = XLSX.utils.sheet_to_json(sheet)
      for (let i = 0; i < parsedSheet.length; i++) {
        dispatch(setCurReservation({ id: -1, resAction: 'save', timeInput: 'button'}))
        const res: any = parsedSheet[i]
        dispatch(editCurReservation({
          id: -1, name: res['Student: Account Name'], examName: res['Course Section'].substring(0, 8),
          startTime: null, totalTimeOnExam: 3600, timeAdded: 0,
          privateRoom: false, computerNeeded: false, onlineExam: false,
          tenMinWarningGiven: false, running: false, assigned: false
        }))
        dispatch(actOnReservation())
      }
      console.log(parsedSheet)
    }
    reader.readAsBinaryString(file)
  }
  return { reservationSheetParser }
}
export default useFileParser