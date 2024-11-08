import Reservation from "./Reservation"

class Room {
    name: string
    reservation: number
    privateRoom: boolean
    hasComputer: boolean
    available: boolean
    runningTimer: boolean

    constructor(name: string, reservation: number, privateRoom: boolean, hasComputer: boolean, available: boolean){
        this.name = name
        this.reservation = reservation
        this.privateRoom = privateRoom
        this.hasComputer = hasComputer
        this.available = available
        this.runningTimer = false
    }

    updateAvailability(){
        this.available = !this.available
    }
}

export default Room