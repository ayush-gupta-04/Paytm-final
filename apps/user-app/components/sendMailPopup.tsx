'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordPopupAtom } from "@paytm-repo/store/atom";
import { emailFormat, emailSchema } from "@repo/schema/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { ShootMailForPassChange, ShootMailForPassChangeWhenLoggedIn } from "../app/action/shootmailforpasschange";
import BackIcon from "./backIcon";
import Success from "@repo/ui/success";
import Error from "@repo/ui/error";
import Button1 from "./button";

type BackendResponseWithToken = {
    success : boolean | null,
    message : string,
    otpToken : string | null
}

export default function SendEmailPopup({onSuccess,onBack,step,setStep} : {onSuccess : () => void,onBack : () => void,step : string | null,setStep : Dispatch<SetStateAction<string | null>>}){
    const[response,setResponse] = useState<BackendResponseWithToken>({
        success : null,
        message : "",
        otpToken : null
    })
    const[loading,setLoading] = useState(false)
    const setChangePasswordPopup = useSetRecoilState(changePasswordPopupAtom);
    const {register,handleSubmit,formState : {errors},reset} = useForm<emailFormat>({resolver : zodResolver(emailSchema)});
    async function onFormSubmit(data : emailFormat){
        setLoading(true);
        const res = await ShootMailForPassChangeWhenLoggedIn(data) as BackendResponseWithToken;
        setResponse(res);
        setLoading(false);
        if(res.success){
            console.log(res)
            setChangePasswordPopup({email : data.email,token : res.otpToken,otp : null});
            setTimeout(() => {
                onSuccess()
            }, 1500);
        }
    } 
    return(
        <div className="fixed z-20 top-1/2 left-1/2 transition-all -translate-x-1/2 -translate-y-1/2 w-1/3 bg-white shadow-black shadow-xl py-3 px-4 rounded-lg" onClick={(e) => {e.stopPropagation()}}>
            <div className="border-b-2 py-2 px-2 text-lg font-medium flex justify-between">
                <div>Send Verification email</div>
                <div onClick={(e) => {onBack();e.stopPropagation()}} className="hover:text-blue-700 cursor-pointer">
                    <BackIcon></BackIcon>
                </div>
            </div>
            <form  onSubmit = {handleSubmit(onFormSubmit)} className="rounded-b-lg pt-4 flex flex-col gap-4">
                <div className="relative">
                    <input placeholder="example@gmail.com"
                    disabled = {loading}
                    {...register("email")}
                    className="peer focus:bg-white shadow-sm w-full hover:bg-slate-50 rounded-md  px-3 py-3   transition-all placeholder-shown:border  focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0  placeholder:opacity-0 focus:placeholder:opacity-100" />
                    {errors.email && (
                        <div className="text-red-600">
                            {errors.email.message}
                        </div>
                    )}
                    <label
                        className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Enter Email
                    </label>
                </div>
                <div>
                    <Success message={response.message} success = {response.success}></Success>
                    <Error message={response.message} success = {response.success}></Error>
                </div>
                <div className="flex flex-row gap-2">
                    <div className="bg-slate-300 hover:bg-slate-400 w-full py-3 rounded-lg active:scale-95 transition-all text-center" aria-disabled = {loading} onClick={(e) => {setResponse({success : null,message : "",otpToken : null});setStep(null);setChangePasswordPopup(null);e.stopPropagation()}}>Cancel</div>
                    <Button1 loading = {loading} text = {"Send email"}></Button1>
                </div>
            </form>
        </div>
    )
}