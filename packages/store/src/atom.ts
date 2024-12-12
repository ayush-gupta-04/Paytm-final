import { atom, atomFamily, selector } from "recoil";
import { recoilPersist } from 'recoil-persist';
import {Gender} from "prisma/prisma-client"

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


type AddressType = {
    city : string | null,
    address : string | null,
    country : string | null,
    pincode : string  | null
}
export const addressAtom = atom<AddressType | null>({
    key : "address",
    default : null
})

export const upiAtom = atom<string | null>({
    key : "upi",
    default : null,
    // effects_UNSTABLE : [persistAtom]
})
type PersonalDetailsType = {
    firstname : string | null,
    lastname : string | null,
    dob : string | null,
    gender : Gender | null
}
export const personalDetailsAtom = atom<PersonalDetailsType | null>({
    key : "personal",
    default : null
})

export const phoneAtom = atom<string | null>({
    key : "phone",
    default : null,
    // effects_UNSTABLE : [persistAtom]
})