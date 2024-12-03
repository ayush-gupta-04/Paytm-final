'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import {changePassFormat, changePassSchema } from "@repo/schema/zod";
import Error from "@repo/ui/error";
import Success from "@repo/ui/success";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ChangePassword } from "../../../action/changepass";
import Image from "next/image";

type BackendResponse = {
    success : boolean | null,
    message : string,
}


export default function ChnagePassword({params }: any){
    const router = useRouter();
    const[loading,setLoading] = useState(false);
    const[response,setResponse] = useState<BackendResponse>({
        message : '',
        success : null,
    });
    const {register,handleSubmit,formState : {errors}} = useForm<changePassFormat>({resolver : zodResolver(changePassSchema)});
    async function forgotPassword(data : changePassFormat){
        setLoading(true)
        const res = await ChangePassword({password : data.password,confirmPass : data.confirmPass,otpToken : params.id}) as BackendResponse;
        setLoading(false);
        setResponse(res);
    }
    if(response.success){
        setTimeout(() => {
            router.push("/auth/signin")
        },500)
    }
    return (
        <div className="w-1/3 bg-white px-8 py-8 text-center flex flex-col gap-3 rounded-lg">
            <div className="flex  flex-row justify-between">
                <Image src={"/back.svg"} alt = {""} className="size-6 cursor-pointer self-center" onClick={() => {router.back()}}/>
            <header className="text-4xl  font-serif font-bold text-slate-800 mb-4  mt-2">
                Enter new Password
            </header>
            <span></span>
            </div>
            <form className="flex flex-col" onSubmit={handleSubmit(forgotPassword)}>
                <div className="relative mb-4">
                    <input placeholder="New Password"
                    {...register("password")}
                    type="password"
                    className="peer focus:bg-white shadow-sm w-full hover:bg-slate-50 rounded-md  px-3 py-3   transition-all placeholder-shown:border  focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0  placeholder:opacity-0 focus:placeholder:opacity-100" />
                    {errors.password && (
                        <div className="text-red-600">
                            {errors.password.message}
                        </div>
                    )}
                    <label
                        className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        password
                    </label>
                </div>
                <div className="relative mb-3">
                    <input placeholder="Confirm password"
                    type="password"
                    {...register("confirmPass")}
                    className="peer focus:bg-white shadow-sm w-full hover:bg-slate-50 rounded-md  px-3 py-3   transition-all placeholder-shown:border  focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0  placeholder:opacity-0 focus:placeholder:opacity-100" />
                    {errors.confirmPass && (
                        <div className="text-red-600">
                            {errors.confirmPass.message}
                        </div>
                    )}
                    <label
                        className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Confirm password
                    </label>
                </div>
                <div>
                    {errors.root && (
                            <div className="text-red-600">
                                {errors.root.message}
                            </div>
                    )}
                </div>
                <div className="mb-3">
                    <Success message={response.message} success = {response.success}></Success>
                    <Error message={response.message} success = {response.success}></Error>
                </div>
                <button className = {`bg-gray-900 hover:bg-gray-700 rounded-md text-white w-full py-3`}>
                    {loading?"Loading...":"Change Password"}
                </button>
                {/* <div className={`${response.success?"":"hidden"} text-md text-gray-800 cursor-pointer`}>
                    Go back to Login
                </div> */}
            </form>
        </div>
    )
}


