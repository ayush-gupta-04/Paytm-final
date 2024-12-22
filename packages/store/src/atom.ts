import { atom, atomFamily, selector } from "recoil";
import { recoilPersist } from 'recoil-persist';
import {Gender} from "prisma/prisma-client"
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
    default : null,
    // effects_UNSTABLE : [persistAtom]
})

export const phoneAtom = atom<string | null>({
    key : "phone",
    default : null,
    // effects_UNSTABLE : [persistAtom]
})

type onRampTnx = {
    onRamp: boolean;
    send: boolean;
    p2p : boolean;
    time: string;
    amount: number;
    status: string;
    provider: string;
    timeInSeconds: number;
} 

type p2pTnx = {
    onRamp: boolean;
    send: boolean;
    p2p : boolean;
    transactionId: string;
    sender: {
        name: string;
        phone: string | null;
        upi: string | null;
    };
    receiver: {
        name: string;
        phone: string | null;
        upi: string | null;
    };
    amount: number;
    time: string;
    timeInSeconds: number;
    
}

type CombinedTransactions = p2pTnx | onRampTnx

export const transactionAtom = atom<CombinedTransactions[] | null>({
    key: "tnx",
    default : null
})


export const changePasswordPopupAtom = atom<{email : string | null,token : string | null,otp : string | null} | null>({
    key : "changePasswordPopup",
    default : null
})

export const transferToPhoneAtom = atom<{phone : string | null,amount : string | null} | null>({
    key : "tophone",
    default : null
})