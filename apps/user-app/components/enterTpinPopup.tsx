'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react"
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import BackIcon from "./backIcon";
import Error from "@repo/ui/error";
import Button1 from "./button";
import { tpinFormat, tpinSchema } from "@repo/schema/zod";
import { transferToPhoneAtom } from "@paytm-repo/store/atom";
import { p2pTransferToPhone } from "../app/action/p2pTransferToPhoneUpi";
import Loader from "./loader";
type BackendResponse = {
    success : boolean| null,
    message : string,
}


export default function EnterTPINpopup({onSuccess,onBack,setStep,step} : {onSuccess : () => void,onBack : () => void,setStep : Dispatch<SetStateAction<string | null>>,step : string | null}){
    const[response,setResponse] = useState<BackendResponse>({
        success : null,
        message : "",
    })
    const[loading,setLoading] = useState(false)
    const[transferToPhone,setTransferToPhone] = useRecoilState(transferToPhoneAtom);
    const {register,handleSubmit,formState : {errors}} = useForm<tpinFormat>({resolver : zodResolver(tpinSchema)});
    async function onFormSubmit(data : tpinFormat){
        setResponse({success : null,message : ""})
        setLoading(true);
        const res = await p2pTransferToPhone({phone : transferToPhone?.phone || "" , amount : transferToPhone?.amount || "" , tpin : data.tpin1 + data.tpin2 + data.tpin3 + data.tpin4 + data.tpin5 + data.tpin6}) as BackendResponse;
        setResponse(res);
        setLoading(false);
        if(res.success){
            onSuccess()
        }
    }
    return(
        <div className="fixed z-20 top-1/2 left-1/2 transition-all -translate-x-1/2 -translate-y-1/2 w-1/3 bg-white shadow-black shadow-xl py-3 px-4 rounded-lg" onClick={(e) => {e.stopPropagation()}}>
            <div className="border-b-2 py-2 px-2 text-xl font-medium flex justify-between">
                <div>Enter TPIN</div>
                <div onClick={(e) => {onBack();e.stopPropagation()}} className="hover:text-blue-700 cursor-pointer">
                    <BackIcon></BackIcon>
                </div>
            </div>
            <form  onSubmit={handleSubmit(onFormSubmit)}  className="rounded-b-lg pt-4 flex flex-col gap-4">
                <div className="flex flex-row justify-center gap-4">
                    <input type="text" className="h-12 w-12 border border-black rounded-lg text-xl text-center focus:outline-blue-600 transition-all focus:scale-105" {...register("tpin1")}  maxLength={1}/>
                    <input type="text" className="h-12 w-12 border border-black rounded-lg text-xl text-center focus:outline-blue-600 transition-all focus:scale-105" {...register("tpin2")} maxLength={1}/>
                    <input type="text" className="h-12 w-12 border border-black rounded-lg text-xl text-center focus:outline-blue-600 transition-all focus:scale-105" {...register("tpin3")} maxLength={1}/>
                    <input type="text" className="h-12 w-12 border border-black rounded-lg text-xl text-center focus:outline-blue-600 transition-all focus:scale-105" {...register("tpin4")} maxLength={1}/>
                    <input type="text" className="h-12 w-12 border border-black rounded-lg text-xl text-center focus:outline-blue-600 transition-all focus:scale-105" {...register("tpin5")} maxLength={1}/>
                    <input type="text" className="h-12 w-12 border border-black rounded-lg text-xl text-center focus:outline-blue-600 transition-all focus:scale-105" {...register("tpin6")} maxLength={1} />
                </div>
                <div>
                    {loading && <div className="py-2 transition-all scale-75"><Loader></Loader></div>}
                    <Error message={response.message} success = {response.success}></Error>
                </div>
                <div className="flex flex-row gap-2">
                    <div className="bg-slate-300 hover:bg-slate-400 w-full py-3 rounded-lg active:scale-95 transition-all text-center" aria-disabled = {loading} onClick={(e) => {setResponse({success : null,message : ""});setStep(null);setTransferToPhone(null);e.stopPropagation()}}>Cancel</div>
                    <Button1 loading = {loading} text = {"Pay now"}></Button1>
                </div>
            </form>
        </div>
    )
}