import Reservation from "./Reservation"

class Room {
    name: string
    reservation: Reservation | null
    privateRoom: boolean
    hasComputer: boolean
    available: boolean

    constructor(name: string, reservation: Reservation | null, privateRoom: boolean, hasComputer: boolean, available: boolean){
        this.name = name
        this.reservation = reservation
        this.privateRoom = privateRoom
        this.hasComputer = hasComputer
        this.available = available
    }

    updateAvailability(){
        this.available = !this.available
    }
}

export default Room