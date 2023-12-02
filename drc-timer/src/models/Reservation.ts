class Reservation {
    name: string
    startTime: Date | null
    totalTimeOnExam: number
    privateRoom: boolean
    computerNeeded: boolean
    onlineExam: boolean

    constructor(name: string, startTime: Date | null, totalTimeOnExam: number, privateRoom: boolean, computerNeeded: boolean, onlineExam: boolean){
        this.name = name
        this.startTime = startTime
        this.privateRoom = privateRoom
        this.totalTimeOnExam = totalTimeOnExam
        this.computerNeeded = computerNeeded
        this.onlineExam = onlineExam
    }

}

export default Reservation