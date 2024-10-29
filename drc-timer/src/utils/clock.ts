type Listener = ()=> void

export class Clock {
    private _listeners: Listener[] = []

    private _notifyAll(){
        this._listeners.forEach(eachListener=>{eachListener()})
    }

    public addListener(listener: Listener){
        this._listeners.push(listener)
    }

    public removeListener(listener: Listener){
        const index = this._listeners.indexOf(listener)
        this._listeners.splice(index)
    }

    private _timer : NodeJS.Timeout | undefined
    private _interval : number

    public constructor(interval: number){
        this._interval = interval
        this.start()
    }

    public start() {
        this._timer = setInterval(()=> {this._tick()}, this._interval)
    }

    private _tick(){
        this._notifyAll()
    }

    public stop(){
        clearInterval(this._timer)
    }
}