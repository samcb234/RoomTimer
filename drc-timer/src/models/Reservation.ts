import { formatTime } from "../utils/formatTime"

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

    //returns the total time on the exam if the exam isn't running, or the time left
    // if the exam is currently going
    timeCheckSeconds() {
        if(this.startTime === null){
            return this.totalTimeOnExam
        }
        const d: Date = new Date()
        const dif = this.startTime.getTime() -  d.getTime() //this value is a negative millisecond value, represents how much time has passed since the timer restarted
        return this.totalTimeOnExam - Math.abs(dif/1000)
    }

    //adds the new start date so we get an accurate countdown
    startTimer() {
        this.startTime = new Date()
    }

    //pauses the timer by setting the start time to null (as the start time will be readded when the timer starts again) and updates the total time left on the exam
    pauseTime() {
        if(this.startTime !== null){
            const d: Date = new Date()
            const time: number = Math.abs((this.startTime.getTime() - d.getTime())/1000)
            this.totalTimeOnExam = this.totalTimeOnExam - time
            this.startTime = null
        }
    }

    timeCheckString(){
        return formatTime(this.timeCheckSeconds())
    }

}

export default Reservation