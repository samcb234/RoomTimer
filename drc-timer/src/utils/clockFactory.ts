import { Clock } from "./clock"

export default class ClockFactory{
    private static clock: Clock | undefined = undefined

    private constructor(){ClockFactory.clock=undefined}

    public static instance(interval: number): Clock {
        if(ClockFactory.clock=== undefined){
            return new Clock(interval)
        }
        return ClockFactory.clock
    }
}