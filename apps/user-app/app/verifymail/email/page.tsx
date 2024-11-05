'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import {emailFormat, emailSchema } from "@repo/schema/zod";
import Error from "@repo/ui/error";
import Success from "@repo/ui/success";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ShootMail } from "../../action/shootmail";

type BackendResponse = {
    success : boolean | null,
    message : string,
    userIdToken : null | string
}


export default function EmailForEmailVerification(){
    const router = useRouter();
    const[loading,setLoading] = useState(false);
    const[response,setResponse] = useState<BackendResponse>({
        message : '',
        success : null,
        userIdToken : null
    });
    const {register,handleSubmit,formState : {errors},resetField} = useForm<emailFormat>({resolver : zodResolver(emailSchema)});
    async function shootMailToEmail(data : emailFormat){
        setLoading(true)
        const res = await ShootMail(data) as BackendResponse;
        setLoading(false);
        setResponse(res);
        resetField;
    }
    return (
        <div className="w-1/3 bg-white px-8 py-8 text-center flex flex-col gap-3 rounded-lg">
            <div className="flex  flex-row justify-between">
                <img src="/back.svg" className="size-6 cursor-pointer self-center" onClick={() => {router.back()}}/>
            <header className="text-4xl  font-serif font-bold text-slate-800 mb-4  mt-2">
                Enter email
            </header>
            <span></span>
            </div>
            <form className="flex flex-col" onSubmit={handleSubmit(shootMailToEmail)}>
                <div className="relative mb-2">
                    <input placeholder="Email"
                    {...register("email")}
                    className="peer focus:bg-white shadow-sm w-full hover:bg-slate-50 rounded-md  px-3 py-3   transition-all placeholder-shown:border  focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0  placeholder:opacity-0 focus:placeholder:opacity-100" />
                    {errors.email && (
                        <div className="text-red-600">
                            {errors.email.message}
                        </div>
                    )}
                    <label
                        className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Email
                    </label>
                </div>
                <div className="flex flex-row justify-between">
                    <div>
                    </div>
                    <div className={`text-gray-600 hover:text-blue-600 font-medium hover:cursor-pointer mb-2 text-sm ${response.success?"":"hidden"}`}
                    onClick={() => {router.push(`/verifymail/verifyotp/${response.userIdToken}`)} }>
                        verify otp
                    </div>
                </div>
                <div className="mb-2 mt-4">
                    <Success message={response.message} success = {response.success}></Success>
                    <Error message={response.message} success = {response.success}></Error>
                </div>
                <button className = {`bg-gray-900 hover:bg-gray-700 rounded-md text-white w-full py-3`}>
                    {loading?"Loading...":"Send Otp"}
                </button>
            </form>
        </div>
    )
}


