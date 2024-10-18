export function //formats a time in seconds as HH:MM:SS
formatTime(timeLeft: number): string {

    const helper = (t: number): string =>{
        const hrs: number = Math.floor(t/3600)
        const min: number = Math.floor((t%3600)/60)
        const secNum: number = t%60
        const sec: string = secNum >= 10 ? String(secNum) : `0${secNum}`
        return `${hrs}:${min}:${sec.split('.')[0]}`
    }

    if(timeLeft >= 0){
        return helper(timeLeft)
    } else {
        return `+ ${helper(-1 * timeLeft)}`
    }
}