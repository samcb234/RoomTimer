import Room from "../../models/Room";

export const AddToSpecificRoomButton: React.FC<{ rooms: Room[], assign: any, buttonString: string}> = (props) => {
    return (
        <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {props.buttonString}
            </button>
            <ul className="dropdown-menu">
                {props.rooms.map(room => (
                    <li><a className="dropdown-item" href="#" onClick={()=>props.assign(room)}>{room.name}</a></li>
                ))}
            </ul>
        </div>
    )
}