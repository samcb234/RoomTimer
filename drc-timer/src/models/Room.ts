import Reservation from "./Reservation"

class Room {
    name: string
    reservation: Reservation | null
    privateRoom: boolean
    hasComputer: boolean

    constructor(name: string, reservation: Reservation | null, privateRoom: boolean, hasComputer: boolean){
        this.name = name
        this.reservation = reservation
        this.privateRoom = privateRoom
        this.hasComputer = hasComputer
    }
}

export default Room