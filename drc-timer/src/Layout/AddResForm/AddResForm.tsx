import { useState } from "react"
import Reservation from "../../models/Reservation"
import Room from "../../models/Room"
import { AddToSpecificRoomButton } from "../../utils/AddToSpecificRoomButton/AddToSpecificRoomButton"

export const AddResForm: React.FC<{ addReservation: any, addDirectToRandomRoom: any, availableRooms: Room[], updateAvailableRooms: any }> = (props) => {
    const [name, setName] = useState('')
    const [examName, setExamName] = useState('')
    const [totalTimeOnExam, setTotalTimeOnExam] = useState(0)
    const [privateRoom, setPrivateRoom] = useState(false)
    const [computerNeeded, setComputerNeeded] = useState(false)
    const [onlineExam, setOnlineExam] = useState(false)


    function addRes() {
        const res: Reservation = new Reservation(name, examName, null, totalTimeOnExam * 60,
            privateRoom, computerNeeded, onlineExam)
        props.addReservation(res)
        resetForm()
    }

    function addDirectToSpecificRoom(room: Room) {
        if (room.available && (room.reservation === null || room.reservation === undefined)) {
            const computerCheck: boolean = computerNeeded ? room.hasComputer : true
            const privateRoomCheck: boolean = privateRoom ? room.privateRoom : true

            if (computerCheck && privateRoomCheck) {
                room.reservation = new Reservation(name, examName, null, totalTimeOnExam * 60,
                    privateRoom, computerCheck, onlineExam)
            }

            resetForm()
            props.updateAvailableRooms()
        }
    }

    function addDirectToRandomRoom() {
        props.addDirectToRandomRoom(new Reservation(name, examName, null,
            totalTimeOnExam * 60, privateRoom, computerNeeded, onlineExam))
        resetForm()
    }

    function resetForm() {
        setName('')
        setExamName('')
        setTotalTimeOnExam(0)
        setPrivateRoom(false)
        setComputerNeeded(false)
        setOnlineExam(false)
    }

    return (
        <div className="container mt-3">
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Students Name</span>
                <input type="text" className="form-control" placeholder="Student Name" aria-label="Username" aria-describedby="basic-addon1"
                    value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon2">Exam Name</span>
                <input type="text" className="form-control" placeholder="Exam Name" aria-label="Username" aria-describedby="basic-addon2"
                    value={examName} onChange={e => setExamName(e.target.value)} />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon2">Exam Length</span>
                <input type="number" className="form-control" placeholder="Exam Length (minutes)" aria-label="Username" aria-describedby="basic-addon2"
                    value={totalTimeOnExam === 0 ? '' : totalTimeOnExam} onChange={e => setTotalTimeOnExam(Number(e.target.value))} />
            </div>
            <div className="row">
                <div className="col">
                    <div className="input-group mb-3">
                        <input className="form-check-input" type="checkbox" value="" onClick={() => setPrivateRoom(!privateRoom)} />
                        <label className="form-check-label">
                            Private Room
                        </label>
                    </div>
                </div>
                <div className="col">
                    <div className="input-group mb-3">
                        <input className="form-check-input" type="checkbox" value="" onClick={() => setComputerNeeded(!computerNeeded)} />
                        <label className="form-check-label">
                            Computer Accomodation
                        </label>
                    </div>
                </div>
                <div className="col">
                    <div className="input-group mb-3">
                        <input className="form-check-input" type="checkbox" value="" onClick={() => { setOnlineExam(!onlineExam) }} />
                        <label className="form-check-label">
                            Online Exam
                        </label>
                    </div>
                </div>
            </div>



            <div className="row">
                <div className="col">
                    <button className="btn btn-primary" onClick={() => addRes()}>Add Reservation</button>
                </div>
                <div className="col">
                    <button className="btn btn-primary" onClick={() => addDirectToRandomRoom()}>Add To Random Room</button>
                </div>
                <div className="col">
                    <AddToSpecificRoomButton rooms={props.availableRooms} assign={addDirectToSpecificRoom} buttonString="Create And Add To Specific Room" />
                </div>
            </div>
        </div>
    )
}