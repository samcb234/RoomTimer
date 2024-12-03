import Reservation from "../../models/Reservation"
import { AddToSpecificRoomButton } from "../../utils/AddToSpecificRoomButton/AddToSpecificRoomButton"
import useResForm from "../../hooks/useResForm"
import { useSelector } from "react-redux";
import { ReservationState } from "../../stores";
import { useState } from "react";

interface AddResFormProps {
    saveChangeAction: (reservation: Reservation) => void;
    reassignAction: (reservation: Reservation, roomName: string) => void;
}

const AddResForm = ({ saveChangeAction, reassignAction }: AddResFormProps) => {
    const { validRoom, setName, setExamName, setTotalTimeOnExam, setPrivateRoom, setComputerNeeded, setOnlineExam,
        curReservation, rooms } = useResForm()

    const { resAction, timeInput } = useSelector((state: ReservationState) => state.reservationReducer)

    const [extraMinutes, setExtraMinutes] = useState<number>(0)

    function assign(roomName: string) {
        reassignAction(curReservation, roomName)
    }

    const asdf = () => {
        saveChangeAction(curReservation)
        setExtraMinutes(0)
    }

    const addExtraMinute = () => {
        setTotalTimeOnExam((curReservation.totalTimeOnExam / 60) + 1)
        setExtraMinutes(extraMinutes + 1)
    }

    return (
        <div className="container mt-3">
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Students Name</span>
                <input type="text" className="form-control" placeholder="Student Name" aria-label="Username" aria-describedby="basic-addon1"
                    value={curReservation.name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon2">Exam Name</span>
                <input type="text" className="form-control" placeholder="Exam Name" aria-label="Username" aria-describedby="basic-addon2"
                    value={curReservation.examName} onChange={e => setExamName(e.target.value)} />
            </div>
            <div className="input-group mb-3">
                {resAction === 'edit' ? <>
                    {timeInput === 'button' ?
                        <button className="btn btn-primary" onClick={() => addExtraMinute()}>
                            {`Add Extra Minute (${extraMinutes}) added`}
                        </button>
                        :
                        <>
                            <span className="input-group-text" id="basic-addon2">Exam Length</span>
                            <input type="number" className="form-control" placeholder="Total Exam Length (minutes)" aria-label="Username" aria-describedby="basic-addon2"
                                value={curReservation.totalTimeOnExam === 0 ? '' : curReservation.totalTimeOnExam / 60} onChange={e => setTotalTimeOnExam(Number(e.target.value))} />
                        </>
                    }
                </>
                    :
                    <>
                        <span className="input-group-text" id="basic-addon2">Exam Length</span>
                        <input type="number" className="form-control" placeholder="Total Exam Length (minutes)" aria-label="Username" aria-describedby="basic-addon2"
                            value={curReservation.totalTimeOnExam === 0 ? '' : curReservation.totalTimeOnExam / 60} onChange={e => setTotalTimeOnExam(Number(e.target.value))} />

                    </>}
            </div>
            <div className="row">
                <div className="col">
                    <div className="input-group mb-3">
                        <input className="form-check-input" type="checkbox" value="" checked={curReservation.privateRoom} onClick={() => setPrivateRoom(!curReservation.privateRoom)} />
                        <label className="form-check-label">
                            Private Room
                        </label>
                    </div>
                </div>
                <div className="col">
                    <div className="input-group mb-3">
                        <input className="form-check-input" type="checkbox" value="" checked={curReservation.computerNeeded} onClick={() => setComputerNeeded(!curReservation.computerNeeded)} />
                        <label className="form-check-label">
                            Computer Accomodation
                        </label>
                    </div>
                </div>
                <div className="col">
                    <div className="input-group mb-3">
                        {curReservation.onlineExam ?
                            <input className="form-check-input" type="checkbox" value="" onClick={() => { setOnlineExam(!curReservation.onlineExam) }} checked />
                            :
                            <input className="form-check-input" type="checkbox" value="" onClick={() => { setOnlineExam(!curReservation.onlineExam) }} />}
                        <label className="form-check-label">
                            Online Exam
                        </label>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <button className="btn btn-primary" onClick={() => asdf()} data-bs-dismiss='modal' >
                        {resAction === 'save' ? 'Save' : 'Edit'}
                    </button>
                </div>
                <div className="col">
                    <AddToSpecificRoomButton rooms={rooms.filter(room => validRoom(room))} assign={assign}
                        buttonString="Create And Add To Specific Room" dismissModal={true} />
                </div>
            </div>
        </div>
    )
}

export default AddResForm;