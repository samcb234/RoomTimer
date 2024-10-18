import Room from "../../models/Room";

export type template = {
    name: string
    privateRoom: boolean
    hasComputer: boolean
}

export const templateList: template[] = [

    {name: '11a', privateRoom: true, hasComputer:false},
    {name: '11b' , privateRoom: true , hasComputer:true},
    {name: '11c' , privateRoom: true , hasComputer:false},
    {name: '11d' , privateRoom: true , hasComputer:false},
    {name: '11e' , privateRoom: true , hasComputer:false},
    {name: '11f' , privateRoom: true , hasComputer:false},
    {name: '11g' , privateRoom: true , hasComputer:false},
    {name: '11h' , privateRoom: true , hasComputer:true},
    {name: '18', privateRoom: true, hasComputer:false},
    {name: '19', privateRoom: true, hasComputer:false},
    {name: '20', privateRoom: true, hasComputer:false},
    {name: '21', privateRoom: true, hasComputer:false},
    {name: '22', privateRoom: true, hasComputer:false},
    {name: '23', privateRoom: true, hasComputer:false},
    {name: '24', privateRoom: true, hasComputer:true},
    {name: '28', privateRoom: true, hasComputer:false},
    {name: '30', privateRoom: true, hasComputer:false},
    {name: '32', privateRoom: true, hasComputer:true},
    {name: '34', privateRoom: true, hasComputer:true},
    {name: 'A', privateRoom: false, hasComputer: false},
    {name: 'B', privateRoom: false, hasComputer: false},
    {name: 'C', privateRoom: false, hasComputer: false},
    {name: 'D', privateRoom: false, hasComputer: false},
    {name: 'E', privateRoom: false, hasComputer: false},
    {name: 'F', privateRoom: false, hasComputer: false},
    {name: 'G', privateRoom: false, hasComputer: false},
    {name: 'H', privateRoom: false, hasComputer: false},
    {name: 'I', privateRoom: false, hasComputer: false},
    {name: 'J', privateRoom: false, hasComputer: false},
    {name: 'K', privateRoom: false, hasComputer: false},
    {name: 'L', privateRoom: false, hasComputer: false},
    {name: 'M', privateRoom: false, hasComputer: false},
    {name: 'N', privateRoom: false, hasComputer: false},
    {name: 'O', privateRoom: false, hasComputer: false},
]