export function //formats a time in seconds as HH:MM:SS
formatTime(timeLeft: number): string {
    const hrs: number = Math.floor(timeLeft/3600)
    const min: number = Math.floor((timeLeft%3600)/60)
    const sec: number = timeLeft%60
    return `${hrs}:${min}:${String(sec).split('.')[0]}`
}