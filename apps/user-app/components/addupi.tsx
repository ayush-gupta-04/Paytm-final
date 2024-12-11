'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import Error from "@repo/ui/error";
import Success from "@repo/ui/success";
import { useState } from "react"
import { useForm } from "react-hook-form";
import { addUpiIdAction } from "../app/action/changeUpiPhone";
import { AddUpiFormat, AddUpiSchema } from "@repo/schema/zod";
import { useSetRecoilState } from "recoil";
import { upiAtom } from "@paytm-repo/store/atom";
type BackendResponse = {
    success : boolean | null,
    message : string,
}

export default function AddUpiID({upi} : {upi : string | null }){
    const[response,setResponse] = useState<BackendResponse>({
        success : null,
        message : ""
    })
    const setUpi = useSetRecoilState(upiAtom);
    const[hide,setHide] = useState(true);
    const[loading,setLoading] = useState(false);
    const {register,handleSubmit,formState : {errors},reset} = useForm<AddUpiFormat>({resolver : zodResolver(AddUpiSchema),defaultValues : {upi : upi || ""}});   //default value will be given to the upi at first...i have not used atoms for default values here
    async function addUpi(data : AddUpiFormat){
        setLoading(true);
        const res = await addUpiIdAction(data) as BackendResponse;
        setLoading(false);
        setResponse(res);
        if(res.success){
            setUpi(data.upi)
        }
    }
    return(
        <div>
            <div className="bg-white px-4 py-2 flex flex-col rounded-t-lg border-b-2 hover:bg-gray-100" onClick={() => {setHide(!hide)}}>
                <div className="text-xl hover:cursor-pointer hover:font-medium">Change UPI ID</div>
                <div className="text-[#8A8A8A]">add a upi id to make transaction more smooth</div>
            </div>
            {<div className={`w-screen z-10 fixed top-1/2 left-1/2 transition-transform -translate-x-1/2 -translate-y-1/2 h-full duration-200 ${hide?"scale-0":"scale-100"}`} onClick={() => {if(!loading){reset();setResponse({success : null,message : ""});setHide(!hide)}}}>
                <div className="bg-white shadow-slate-800 shadow-2xl   w-1/3 h-fit fixed z-1000 top-1/2 left-1/2 transition-transform -translate-x-1/2 -translate-y-1/2 rounded-lg" onClick={(e) => {e.stopPropagation()}}>
                    <div className=" mx-4 py-4 border-b-2 ">Change UPI ID</div>
                    <form onSubmit = {(handleSubmit(addUpi))} className="rounded-b-lg mx-4 pt-4 flex flex-col gap-4">
                        <div className="relative mb-4">
                        <input placeholder="@paytm"
                            disabled = {loading}
                            {...register("upi")}
                            className="peer focus:bg-white shadow-sm w-full hover:bg-slate-50 rounded-md  px-3 py-3   transition-all placeholder-shown:border  focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0  placeholder:opacity-0 focus:placeholder:opacity-100" />
                            {errors.upi && (
                                <div className="text-red-600">
                                    {errors.upi.message}
                                </div>
                            )}
                        <label
                            className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Enter UPI
                        </label>
                        <div className="my-4">
                            <Success message={response.message} success = {response.success}></Success>
                            <Error message={response.message} success = {response.success}></Error>
                        </div>
                        <button className = {`rounded-md text-white w-full py-3 ${loading?"bg-[#4E8FFF]":"bg-[#0560FD] hover:bg-[#0045BD]"}`}
                        disabled = {loading}>
                            {loading?"Loading...":"Change UPI"}
                        </button>
                </div>
                    </form>
                </div>
            </div>
            }
        </div>
    )
}