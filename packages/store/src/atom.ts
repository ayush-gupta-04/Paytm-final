import { atom, atomFamily, selector } from "recoil";

export const loginEmailAtom = atom({
    key : "loginEmail",
    default : ''
})
export const counterAtom = atom({
    key : "counter",
    default : 10
})

export const balanceAtom = atom({
    key : "balance",
    default : 0
})