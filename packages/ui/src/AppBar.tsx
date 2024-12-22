import { useState } from "react"

type AppBarProps = {
    onSignin : any,
    onSignout : any,
    userData : {
        name?: string | null,
        email?: string | null,
        image?: string | null,
    } | undefined ,
    settings : any
}
export default function AppBar({onSignin,onSignout,userData,settings} : AppBarProps){
    return(
        <div className="flex flex-row justify-between px-8 py-2 shadow-md bg-[#ECF5FC]">
            <div className="">
                <img src="./paytm.png" className="h-10 w-64"/>
            </div>
            <div className="flex flex-row gap-8 items-center">
                <div className="hover:cursor-pointer hover:text-[#005EFF]" onClick={settings}>
                    {SettingsIcon()}
                </div>
                <div className="hover:cursor-pointer hover:text-[#005EFF]">
                    {notificationIcon()}
                </div>
                <div >
                    {userData && <Profile onSignout = {onSignout} name = {userData.name} email = {userData.email} image = {userData.image}></Profile>}
                    {!userData && (
                        (
                            <button className="  bg-[#2e89ff] hover:bg-[#5b9ef5] active:bg-[#397ed8] px-6 py-2 rounded-md text-white font-semibold"
                            onClick={onSignin}
                            >Login</button>
                        )
                    )}
                    
                </div>
            </div>
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
        <div className="flex flex-row gap-4 items-center cursor-pointer" onClick={(e) => {setHide(!hide);e.stopPropagation()}}>
            <div className={`size-10 rounded-full ${image?"":"bg-gray-300"} flex justify-center items-center`} >
                <img src= {image || "./profile.svg"} className={`${image?"size-10 rounded-full hover:cursor-pointer":"size-7"}`} />
                <div className={`fixed top-14 z-10 right-8 w-56 h-fit ${hide?"scale-0 origin-top-right":"scale-100 origin-top-right"} cursor-pointer duration-150 transition-all`}>
                <div className="h-16 flex flex-col justify-center items-center bg-white rounded-t-lg  border-t border-l border-r border-slate-300 hover:bg-slate-100 px-2">
                    <div className="text-lg font-semibold">{name}</div>
                    <div className="text-gray-700 font-medium">{email}</div>
                </div>
                    <div className="h-12 flex justify-center items-center bg-white border-b border-l border-r border-slate-300 rounded-b-lg hover:bg-slate-100 px-2"
                    onClick={onSignout}>
                    <div className="flex flex-row gap-1 text-red-500">
                        <img src="./signout.svg" className="size-6 self-center"/>
                        <div className="text-lg font-medium text-red-500">Signout</div>  
                    </div>
                    </div>
                </div>
            </div>
            <div onClick={()=>{setHide(!hide)}} className="hover:cursor-pointer">
                {name}
            </div>
        </div>
    )
}


function notificationIcon(){
    return(
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
</svg>

    )
}
function SettingsIcon(){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path  d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
  <path  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>
    )
}
