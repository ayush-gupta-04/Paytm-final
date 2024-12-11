import { atom, atomFamily, selector } from "recoil";
import { recoilPersist } from 'recoil-persist';
const {persistAtom} = recoilPersist();
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
export const addressAtom = atom<AddressType>({
    key : "address",
    default : {
        city : null,
        address : null,
        country : null,
        pincode : null
    }
})

export const upiAtom = atom<string | null>({
    key : "upi",
    default : null,
    // effects_UNSTABLE : [persistAtom]
})