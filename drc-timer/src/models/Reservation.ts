class Reservation {
    name: string
    examName: string
    startTime: Date | null
    totalTimeOnExam: number //seconds
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

    //formats a time in seconds as HH:MM:SS
    formatTime(timeLeft: number): string {
        const hrs: number = Math.floor(timeLeft/3600)
        const min: number = Math.floor((timeLeft%3600)/60)
        const sec: number = timeLeft%60
        return `${hrs}:${min}:${sec}`
    }

    //returns the total time on the exam if the exam isn't running, or the time left
    // if the exam is currently going
    timeCheck(): string {
        if(this.startTime === null){
            return this.formatTime(this.totalTimeOnExam)
        }
        const d: Date = new Date()
        const dif = this.startTime.getTime() -  d.getTime()
        return this.formatTime(Math.abs(dif/1000))
    }

}

export default Reservation