'use client'

import { useState } from "react"

export default function SetTpin(){
    const[hide,setHide] = useState(true);
    return(
        <div>
            <div className="bg-white px-4 py-2 flex flex-col rounded-t-lg border-b-2 hover:bg-gray-100" onClick={() => {setHide(!hide)}}>
                <div className="text-xl hover:cursor-pointer hover:font-medium">Change TPIN</div>
                <div className="text-[#8A8A8A]">change old tpin with a new one</div>
            </div>
            {!hide && <div className="bg-red-200 w-10 h-12 fixed z-10 top-1/2 left-1/2">
                    
                </div>
            }
        </div>
        
    )
}