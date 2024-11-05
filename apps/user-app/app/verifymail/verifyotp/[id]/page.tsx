'use client'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpFormat, otpSchema } from "@repo/schema/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Success from "@repo/ui/success";
import Error from "@repo/ui/error";
import { verifyingEmailOtp } from "../../../action/verify";
import { resendOTPForEmailVerification } from "../../../action/resend";
import { useRecoilState, useRecoilValue } from "recoil";
import { counterAtom } from "@paytm-repo/store/atom";

type BackendResponse = {
    success : boolean | null,
    message : string,
}
export default function EmailVerifyPage({params} : any){
    const router = useRouter();
    const[loading,setLoading] = useState(false)
    const[response,setResponse] = useState<BackendResponse>({
        message : '',
        success : null,
    });
    const[count,setCount] = useRecoilState(counterAtom);
    useEffect(() => {
        setCount(120)
    },[])
    async function verifyOtp(data : otpFormat){
        setLoading(true);
        const res = await verifyingEmailOtp({otp : data.otp, userIdToken : params.id}) as BackendResponse;
        setResponse(res);
        setLoading(false);
        resetField;
    }
    async function resend(){
        setLoading(true);
        const res = await resendOTPForEmailVerification({userIdToken : params.id}) as BackendResponse
        setResponse(res);
        setLoading(false);
        resetField;
    }
    const {register,handleSubmit,formState : { errors },resetField} = useForm<otpFormat>({resolver : zodResolver(otpSchema)});
    return(
        <div className="w-1/3 bg-white px-8 py-8 text-center flex flex-col gap-4 rounded-lg">
            <div className="flex  flex-row justify-between">
                <img src="/back.svg" className="size-6 cursor-pointer self-center" onClick={() => {router.back()}}/>
            <header className="text-4xl  font-serif font-bold text-slate-800 mb-4  mt-2">
                Enter OTP
            </header>
            <span></span>
            </div>
            <form onSubmit={handleSubmit(verifyOtp)} className="flex flex-col gap-2">
            <div className="relative">
                    <input placeholder="OTP" 
                    className= {`focus:bg-white  peer shadow-sm w-full  rounded-md  hover:bg-slate-50 px-3 py-3  transition-all placeholder-shown:border  focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0  placeholder:opacity-0 focus:placeholder:opacity-100`}
                    {...register("otp")} />
                    {errors.otp && (
                            <div className="text-red-600">
                                {errors.otp.message}
                            </div>
                    )}
                    <label
                        className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        OTP
                    </label>
                </div>
            <div className="flex justify-between">
            <Timer></Timer>
                <button className={`font-semibold  ${count > 0?"text-gray-400":"text-gray-700 hover:text-blue-600 hover:cursor-pointer hover:scale-x-105"}`}
                type="button"
                disabled = {count > 0}
                onClick={() => {
                    resend()
                }}>
                    Resend Otp
                </button>
            </div>
            <div className="my-2">
            <Success message={response.message} success = {response.success}></Success>
            <Error message={response.message} success = {response.success}></Error>
            </div>
            <button className = {`bg-gray-900 hover:bg-gray-700 rounded-md text-white w-full py-3`}>
                {loading?"Loading...":"Verify OTP"}
            </button>
            </form>
        </div>
    )
}


function Timer(){
    const[count,setCount] = useRecoilState(counterAtom);
    if(count > 0){
        setTimeout(() => {
            setCount(count-1)
        },1000)
    }
    return(
        <div className="font-semibold text-gray-600">
            {count} sec
        </div>
    )
}