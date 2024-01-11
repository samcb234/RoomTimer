export function //formats a time in seconds as HH:MM:SS
formatTime(timeLeft: number): string {

    const helper = (t: number): string =>{
        const hrs: number = Math.floor(t/3600)
        const min: number = Math.floor((t%3600)/60)
        const sec: number = t%60
        return `${hrs}:${min}:${String(sec).split('.')[0]}`
    }

    if(timeLeft >= 0){
        return helper(timeLeft)
    } else {
        return `+ ${helper(-1 * timeLeft)}`
    }
}