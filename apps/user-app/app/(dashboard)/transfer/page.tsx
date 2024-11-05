'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { p2pFormat, p2pSchema } from "@repo/schema/zod"
import Error from "@repo/ui/error";
import Success from "@repo/ui/success";
import { useState } from "react";
import { useForm } from "react-hook-form"
import { p2pTransfer } from "../../action/p2pTransfer";
type BackendResponse = {
    success : boolean | null,
    message : string
}
export default function TransferPage(){
    const[loading,setLoading] = useState(false);
    const[response,setResponse] = useState<BackendResponse>({
        success : null,
        message : ""
    })
    const{register,handleSubmit,resetField,formState : {errors}} = useForm<p2pFormat>({resolver : zodResolver(p2pSchema)});
    async function sendMoneyP2P(data : p2pFormat){
        setLoading(true);
        const res = await p2pTransfer(data) as BackendResponse;
        setLoading(false);
        setResponse(res);
        resetField;
    }
    return(
        <div className="flex justify-center flex-row w-full items-center">
            <div className="w-5/12 px-4 py-10  flex flex-col h-fit bg-gray-100 rounded-lg">
                <header className="self-center text-4xl font-bold text-slate-800  mb-8">Send Money</header>
                <form className="flex flex-col gap-6" onSubmit={handleSubmit(sendMoneyP2P)}>
                    <div className="relative">
                        <input placeholder="Amount" 
                        type = {"number"}
                        className="peer focus:bg-white hover:bg-slate-50  w-full rounded-md  p-3   transition-all placeholder-shown:border  focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0  placeholder:opacity-0 focus:placeholder:opacity-100"
                        {...register("amount")} />
                        {errors.amount && (
                                <div className="text-red-600">
                                    {errors.amount.message}
                                </div>
                        )}   
                        <label
                            className=" before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Amount
                        </label>
                    </div>
                    <div className="relative">
                        <input placeholder="Phone" 
                        type = {"number"}
                        className="peer focus:bg-white hover:bg-slate-50  w-full rounded-md  p-3   transition-all placeholder-shown:border  focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0  placeholder:opacity-0 focus:placeholder:opacity-100"
                        {...register("phone")} />
                        {errors.phone && (
                                <div className="text-red-600">
                                    {errors.phone.message}
                                </div>
                        )}   
                        <label
                            className=" before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Phone
                        </label>
                    </div>
                    <div className="relative">
                        <input placeholder="Password" 
                        type = {"password"}
                        className="peer focus:bg-white hover:bg-slate-50  w-full rounded-md  p-3   transition-all placeholder-shown:border  focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0  placeholder:opacity-0 focus:placeholder:opacity-100"
                        {...register("password")} />
                        {errors.password && (
                                <div className="text-red-600">
                                    {errors.password.message}
                                </div>
                        )}   
                        <label
                            className=" before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Password
                        </label>
                    </div>
                        <Success success = {response.success} message={response.message}></Success>
                        <Error success = {response.success} message={response.message}></Error>
                    <button className="bg-blue-500 text-white rounded-md py-3 text-lg hover:bg-blue-400 active:bg-blue-600 font-semibold">{loading?"Loading...":"Send Money"}</button>
                </form>
            </div>
        </div>
    )
}
