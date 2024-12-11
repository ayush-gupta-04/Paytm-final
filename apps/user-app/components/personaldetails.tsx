
type PersonalDetailsType = {
    firstname : string | null,
    lastname : string | null,
    dob : string | null,
    gender : string | null
}

export default function PersonalDetails({firstname,lastname,dob,gender} : PersonalDetailsType){
    return(
        <div className="col-span-3 bg-white shadow-lg rounded-lg mx-3 px-3 py-2">
            <div className="flex justify-between border-b-2">
                <header className="py-2 text-lg  font-medium">Personal details</header>
                <div className="h-fit text-[#07CBFD] my-2 mr-4 hover:cursor-pointer hover:text-black">
                    {EditIcon()}
                </div>
            </div>
            <div className="flex flex-col py-4">
                <div className="flex flex-rows justify-between py-2 px-2">
                    <div className="text-[#8A8A8A] font-medium">firstname</div>
                    <div className="font-medium text-[#404040]">{firstname?`${firstname}`:"--"}</div>
                </div>
                <div className="flex flex-rows justify-between py-2 px-2">
                    <div className="text-[#8A8A8A] font-medium">lastname</div>
                    <div className="font-medium text-[#404040]">{lastname?`${lastname}`:"--"}</div>
                </div>
                <div className="flex flex-rows justify-between py-2 px-2">
                    <div className="text-[#8A8A8A] font-medium">date of birth</div>
                    <div className="font-medium text-[#404040]">{dob?`${dob}`:"--"}</div>
                </div>
                <div className="flex flex-rows justify-between py-2 px-2">
                    <div className="text-[#8A8A8A] font-medium">gender</div>
                    <div className="font-medium text-[#404040]">{gender?`${gender}`:"--"}</div>
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
