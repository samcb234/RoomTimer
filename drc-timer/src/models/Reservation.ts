class Reservation {
    name: string
    examName: string
    startTime: Date | null
    totalTimeOnExam: number
    privateRoom: boolean
    computerNeeded: boolean
    onlineExam: boolean

    constructor(name: string, examName: string, startTime: Date | null, totalTimeOnExam: number, privateRoom: boolean, computerNeeded: boolean, onlineExam: boolean){
        this.name = name
        this.examName = examName
        this.startTime = startTime
        this.privateRoom = privateRoom
        this.totalTimeOnExam = totalTimeOnExam
        this.computerNeeded = computerNeeded
        this.onlineExam = onlineExam
    }

}

export default Reservation