export default function Logout(){
    return(
        <div className="bg-white px-4 py-5 flex flex-col rounded-b-lg hover:bg-gray-100">
            <div className="text-xl flex flex-row justify-between">
                <div  className="text-red-600 hover:cursor-pointer hover:font-medium">Logout</div>
                <div className="text-red-600">{LogoutIcon()}</div>
            </div>
        </div>
    )
}


function LogoutIcon(){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
</svg>

    )
}