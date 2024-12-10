'use client'
import { useState } from "react"
type p2pTransactions = {
    send : boolean
    time : string,
    amount : number,
    name : string,
    phone : string | null
}
type onRampTransactions = {
    time : string,
    amount : number,
    status : string,
    provider : string
}
export default function TransactionsWithFilter({p2pTnx,onRampTnx} : {p2pTnx : p2pTransactions[], onRampTnx : onRampTransactions[]}){
    const[hide,setHide] = useState(true);
    return(
        <div className={`w-full ${hide?"":"grid grid-cols-3 gap-4"}`}>
            <div className={`${hide?"":"col-span-2"} bg-white rounded-lg py-4 px-4`}>
                <div className="py-2 flex justify-between items-center border-b-2">
                    <div className="text-xl font-medium"> Transactions</div>
                    <div className="bg-[#07CBFD] mx-4 px-6 py-1 rounded-lg" onClick={() => {setHide(!hide)}}> filter</div>
                </div>
                <div></div>
            </div>
            {!hide && <div className={`col-span-1 bg-white rounded-lg py-4 px-4 `}>
                    <div className="py-2 flex justify-between items-center border-b-2">
                        <div className="text-xl font-medium"> Filter</div>
                        <div className=" px-4 py-1 rounded-lg text-[#07CBFD]"> {FilterIcon()}</div>
                    </div>
                    <div></div>
                </div>
            }
        </div>
    )
}

function FilterIcon(){
    return(
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
</svg>

    )
}