import Room from "../../models/Room";

export type template = {
    name: string
    privateRoom: boolean
    hasComputer: boolean
}

export const templateList: template[] = [
    {name:'22a', privateRoom:true, hasComputer:true},
    {name: '22b', privateRoom: true, hasComputer: true},
    {name: '24', privateRoom: true, hasComputer: true},
    {name: '25', privateRoom: true, hasComputer: true},
    {name: '28', privateRoom: true, hasComputer: true},
    {name: '32', privateRoom: true, hasComputer: true},
    {name: '34', privateRoom: true, hasComputer: true},
    {name: '36', privateRoom: true, hasComputer: true},
    {name: '37a', privateRoom: false, hasComputer: false},
    {name: '37b', privateRoom: false, hasComputer: false},
    {name: '37c', privateRoom: false, hasComputer: false},
    {name: '38', privateRoom: true, hasComputer: true},
    {name: '39', privateRoom: true, hasComputer: true},
    {name: '40', privateRoom: true, hasComputer: true},
    {name: '41', privateRoom: true, hasComputer: true},
    {name: '42', privateRoom: true, hasComputer: true},
    {name: '43', privateRoom: true, hasComputer: true},
    {name: '47', privateRoom: true, hasComputer: true},
    {name:'L1', privateRoom: false, hasComputer: false},
    {name:'L2', privateRoom: false, hasComputer: false},
    {name:'L3', privateRoom: false, hasComputer: false},
    {name:'L4', privateRoom: false, hasComputer: false},
    {name:'L5', privateRoom: false, hasComputer: false},
    {name:'L6', privateRoom: false, hasComputer: false},
    {name:'L7', privateRoom: false, hasComputer: false},
    {name:'L8', privateRoom: false, hasComputer: false},
    {name:'L9', privateRoom: false, hasComputer: false},
    {name:'L10', privateRoom: false, hasComputer: false}
]