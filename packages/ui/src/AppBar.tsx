import { useState } from "react"

type AppBarProps = {
    onSignin : any,
    onSignout : any,
    userData : {
        name?: string | null,
        email?: string | null,
        image?: string | null,
    } | undefined 
}
export default function AppBar({onSignin,onSignout,userData} : AppBarProps){
    return(
        <div className="flex flex-row justify-between px-8 py-3 shadow-md border-b-2 border-slate-300 border-opacity-30">
            <div className="">
                <img src="./paytm.png" className="h-10 w-64"/>
            </div>
            {userData && <Profile onSignout = {onSignout} name = {userData.name} email = {userData.email} image = {userData.image}></Profile>}
            {!userData && (
                (
                    <button className="  bg-[#2e89ff] hover:bg-[#5b9ef5] active:bg-[#397ed8] px-6 py-2 rounded-md text-white font-semibold"
                    onClick={onSignin}
                    >Login</button>
                )
            )}
        </div>
    )
}
type ProfileProps = {
    onSignout : any,
    name?: string | null,
    email?: string | null,
    image?: string | null,
}
function Profile ({onSignout,name,email,image} : ProfileProps) {
    const[hide, setHide] = useState(true);
    return(
        <div className={`size-10 rounded-full ${"bg-gray-300 cursor-pointer"} flex justify-center items-center`} 
        onClick={()=>{setHide(!hide)}}>
           <img src= {"./profile.svg"} className="size-7" alt = "user"/>
            <div className={`absolute top-14 right-8 w-56 h-fit ${hide?"scale-0 origin-top-right":"scale-100 origin-top-right"} cursor-pointer duration-150 transition-transform`}>
                <div className="h-16 flex flex-col justify-center items-center bg-white rounded-t-lg  border-t border-l border-r border-slate-300 hover:bg-slate-100 px-2">
                    <div className="text-lg font-semibold">{name}</div>
                    <div className="text-gray-700 font-medium">{email}</div>
                </div>
                <div className="h-12 flex justify-center items-center bg-white border-b border-l border-r border-slate-300 rounded-b-lg hover:bg-slate-100 px-2"
                onClick={onSignout}>
                    <div className="flex flex-row gap-1">
                        <img src="./signout.svg" className="size-6 self-center"/>
                        <div className="text-lg font-medium">Signout</div>  
                    </div>
                </div>
            </div>
        </div>
    )
}

