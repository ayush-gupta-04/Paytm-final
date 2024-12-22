'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react"
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import BackIcon from "./backIcon";
import Error from "@repo/ui/error";
import Button1 from "./button";
import { amountFormat, amountSchema, phoneFormat, phoneSchema, tpinFormat, tpinSchema } from "@repo/schema/zod";
import { transferToPhoneAtom } from "@paytm-repo/store/atom";
import { getDetailsOfPhone } from "../app/action/getDetails";
import Tick from "@repo/ui/tick";
import VerifyPhonePopup from "./verifyPhonePopup";
import EnterAmountPopup from "./enterAmountPopup";
import Success from "@repo/ui/success";
import { p2pTransferToPhone } from "../app/action/p2pTransferToPhoneUpi";
import EnterTPINpopup from "./enterTpinPopup";
import AcknowledgementPopup from "./ack";
//verify --> amount --> tpin --> acknowledgement
export default function PayToPhone(){
    const[step,setStep] = useState<string | null>(null);
    function handleNextStep(){
        if(step == 'verify'){
            setStep('amount')
        }else if(step == 'amount'){
            setStep("tpin")
        }else if(step == 'tpin'){
            setStep('acknowledgement')
        }else if(step == 'acknowledgement'){
            setStep(null)
        }
    }
    function handlePreviousStep(){
        if(step == 'verify'){
            setStep(null)
        }else if(step == 'amount'){
            setStep("verify")
        }else if(step == 'tpin'){
            setStep("amount")
        }else if(step == 'acknowledgement'){
            setStep("tpin")
        }
    }
    return(
        <>
        <div className="size-60 hover:scale-105 cursor-pointer transition-all" onClick={() => {setStep('verify')}}>
            <img src="./payToPhone.png" alt="" />
        </div>
        <BackgroundSupporter hide = {step == null}></BackgroundSupporter>
        {step == "verify" && <VerifyPhonePopup onBack={handlePreviousStep} onSuccess={handleNextStep} step = {step} setStep = {setStep}></VerifyPhonePopup>}
        {step == "amount" && <EnterAmountPopup onBack={handlePreviousStep} onSuccess={handleNextStep} step = {step} setStep = {setStep}></EnterAmountPopup>}
            {step == "tpin" && <EnterTPINpopup onBack={handlePreviousStep} onSuccess={handleNextStep} step = {step} setStep = {setStep}></EnterTPINpopup>}
            {step == 'acknowledgement' && <AcknowledgementPopup onSuccess ={handleNextStep}></AcknowledgementPopup>}
        </>
    )
}


function BackgroundSupporter({hide} : {hide : boolean}){
    return(
        <div className={`w-screen fixed z-10 top-1/2 left-1/2 transition-all -translate-x-1/2 -translate-y-1/2 h-full duration-300 ${hide?"opacity-0 pointer-events-none":"opacity-100 backdrop-brightness-50"}`} onClick={(e) => {e.stopPropagation()}}>  
        </div>
    )
} 

