import { useDispatch } from "react-redux";
import Reservation from "../../models/Reservation";
import AddResForm from "./AddResForm";
import {actOnReservation} from "../../reducers/ReservationReducer";

interface AddOrEditModalProps {
    assignAction: (reservation: Reservation, roomName: string) => void;
}

const AddOrEditModal = ({assignAction}: AddOrEditModalProps) => {
    const dispatch = useDispatch();   

    return (
        <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <AddResForm saveChangeAction={()=> dispatch(actOnReservation())} reassignAction={assignAction}/>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddOrEditModal;