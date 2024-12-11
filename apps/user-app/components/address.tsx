'use client'
import { addressAtom } from "@paytm-repo/store/atom"
import { useEffect } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"

type AddressType = {
    city : string | null,
    country : string | null,
    address : string | null,
    pincode : string | null
}

export default function Address({city,address,country,pincode} : AddressType){
    const setAddress = useSetRecoilState(addressAtom);
    const Address = useRecoilValue(addressAtom);
    useEffect(() => {
        setAddress({city,address,country,pincode});
    },[])
    return(
        <div className="col-span-3 bg-white shadow-lg rounded-lg mx-3 px-3 py-2">
            <div className="flex justify-between border-b-2">
                <header className="py-2 text-lg  font-medium">Personal Address</header>
                <div className="h-fit text-[#07CBFD] my-2 mr-4 hover:cursor-pointer hover:text-black">
                    {EditIcon()}
                </div>
            </div>
            <div className="flex flex-col py-4">
                <div className="flex flex-rows justify-between py-2 px-2">
                    <div className="text-[#8A8A8A] font-medium">Address</div>
                    <div className="font-medium text-[#404040]">{Address.address?`${Address.address}`:"--"}</div>
                </div>
                <div className="flex flex-rows justify-between py-2 px-2">
                    <div className="text-[#8A8A8A] font-medium">City</div>
                    <div className="font-medium text-[#404040]">{Address.city?`${Address.city}`:"--"}</div>
                </div>
                <div className="flex flex-rows justify-between py-2 px-2">
                    <div className="text-[#8A8A8A] font-medium">Country</div>
                    <div className="font-medium text-[#404040]">{Address.country?`${Address.country}`:"--"}</div>
                </div>
                <div className="flex flex-rows justify-between py-2 px-2">
                    <div className="text-[#8A8A8A] font-medium">Pincode</div>
                    <div className="font-medium text-[#404040]">{Address.pincode?`${Address.pincode}`:"--"}</div>
                </div>
            </div>
        </div>
    )
}

function EditIcon(){
    return(
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
</svg>
    )
}
