'use client'
import {signupSchema , SignupFormat} from "@repo/schema/zod";
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import Error from "@repo/ui/error";
import Success from "@repo/ui/success";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CreateNewAccount } from "../../action/signup";

type BackendResponse = {
    success : boolean | null,
    message : string,
    userIdToken : string | null
}


export default function SignupPage(){
    const router = useRouter();
    const[loading,setLoading] = useState(false)
    const[response,setResponse] = useState<BackendResponse>({
        message : '',
        success : null,
        userIdToken : null
    });
    const {register,handleSubmit,formState : { errors },resetField} = useForm<SignupFormat>({resolver : zodResolver(signupSchema)});
    async function signup(userdata : SignupFormat){
        setLoading(true);
        const res = await CreateNewAccount(userdata) as BackendResponse;
        setResponse(res);
        setLoading(false);
        resetField;
    }
    // if(response.success && response.userId != null){
    //     setTimeout(() => {
    //         router.push(`/auth/emailotp/${response.userId}`)
    //     }, 1000);
    // }
    return (
        <div className="w-1/3 bg-white px-8 py-8 text-center flex flex-col gap-3 rounded-lg">
            <header className="text-5xl font-serif font-bold text-slate-800">
                Create Account
            </header>
            <div className="text-gray-600 mb-8">
                Enter your credentials to create new account
            </div>
            <form className="flex flex-col" onSubmit={handleSubmit(signup)}>
                <div className="grid grid-cols-2 gap-5 mb-4">
                <div className="relative ">
                    <input placeholder="Firstname" 
                    disabled = {loading}
                    className= {`focus:bg-white  peer shadow-sm w-full rounded-md  hover:bg-slate-50 px-3 py-3  transition-all placeholder-shown:border  focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0  placeholder:opacity-0 focus:placeholder:opacity-100`}
                    {...register("firstname")} />
                    {errors.firstname && (
                            <div className="text-red-600">
                                {errors.firstname.message}
                            </div>
                    )}
                    <label
                        className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Firstname
                    </label>
                </div>
                <div className="relative">
                    <input placeholder="Lastname" 
                    disabled = {loading}
                    className="focus:bg-white shadow-sm peer w-full rounded-md hover:bg-slate-50  px-3 py-3   transition-all placeholder-shown:border  focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0  placeholder:opacity-0 focus:placeholder:opacity-100"
                    {...register('lastname')} />
                    {errors.lastname && (
                            <div className="text-red-600">
                                {errors.lastname.message}
                            </div>
                    )}
                    <label
                        className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Lastname
                    </label>
                </div>
                </div>
                <div className="relative mb-4">
                    <input placeholder="Phone" 
                    disabled = {loading}
                    className="peer focus:bg-white shadow-sm w-full hover:bg-slate-50 rounded-md  px-3 py-3   transition-all placeholder-shown:border  focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0  placeholder:opacity-0 focus:placeholder:opacity-100" 
                    {...register("phone")}/>
                    {errors.phone && (
                            <div className="text-red-600">
                                {errors.phone.message}
                            </div>
                    )}
                    <label
                        className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Phone
                    </label>
                </div>
                <div className="relative mb-4">
                    <input placeholder="Email" 
                    disabled = {loading}
                    className="peer focus:bg-white shadow-sm w-full hover:bg-slate-50 rounded-md  px-3 py-3   transition-all placeholder-shown:border  focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0  placeholder:opacity-0 focus:placeholder:opacity-100" 
                    {...register("email")}/>
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
                <div className="relative mb-4">
                    <input placeholder="Password" 
                    disabled = {loading}
                    type="password"
                    className="peer focus:bg-white  shadow-sm hover:bg-slate-50  w-full rounded-md  px-3 py-3   transition-all placeholder-shown:border  focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0  placeholder:opacity-0 focus:placeholder:opacity-100" 
                    {...register('password')}/>
                    {errors.password && (
                            <div className="text-red-600">
                                {errors.password.message}
                            </div>
                    )}
                    <label
                        className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Password
                    </label>
                </div>
                <div className="flex flex-row justify-between my-1">
                    <div></div>
                    <button className={`text-gray-600 hover:text-blue-600 font-semibold hover:cursor-pointer ${response.success?"":"hidden"}`}
                    type="button"
                    onClick={() => {router.push(`/verifymail/verifyotp/${response.userIdToken}`)}} >
                        Verify OTP
                    </button>
                </div>
                <div className="mb-4">
                    <Success message={response.message} success = {response.success}></Success>
                    <Error message={response.message} success = {response.success}></Error>
                </div>
                <button className={`rounded-md text-white w-full py-3 ${loading?"bg-gray-500":"bg-gray-900 hover:bg-gray-700"}`}
                disabled = {loading}>
                        {loading?"Loading...":"Creat new Account"}
                </button>
            </form>
            <div className="bg-gray-200 py-2 rounded-md flex justify-center gap-3 hover:bg-gray-300 hover:cursor-pointer">
                <img src="/google.svg"/>
                <label className="font-semibold">Signup With google</label>
            </div>
            <div className="flex gap-2 self-center text-gray-500 mt-4">
                <div className="font-serif">
                    Already have an account ?
                </div>
                <div className="font-serif cursor-pointer hover:text-black" onClick={() => {
                    router.push('/auth/signin')
                }}>
                    Login
                </div>
            </div>

        </div>
    )
}