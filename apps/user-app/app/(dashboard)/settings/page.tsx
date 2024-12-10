import AddPhone from "../../../components/addphone"
import Address from "../../../components/address"
import AddUpiID from "../../../components/addupi"
import ChangePassword from "../../../components/changepassword"
import ContactUs from "../../../components/contactus"
import Logout from "../../../components/logout"
import PersonalDetails from "../../../components/personaldetails"
import ProfileCard from "../../../components/profile"
import SetTpin from "../../../components/settpin"

export default async function SettingsPage(){
    
    return (
        <div className="min-h-screen w-full flex flex-col py-4 px-4 gap-8 bg-[#ECF5FC] relative">
            <div className="w-full h-10 shadow-sm bg-white rounded-md flex flex-row justify-between">
                <div className="self-center px-3 font-semibold">Your UPI ID</div>
                <div className="self-center px-3 flex flex-row gap-4">
                    <div className="text-green-600 font-semibold">7970566566@paytm</div>
                    <CopyIcon></CopyIcon>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <div className="w-fit h-fit px-3 py-2 bg-[#0560FD] text-white rounded-lg">
                    Personal settings
                </div>
                <div className="w-full h-fit rounded-lg grid grid-cols-8">
                    <ProfileCard></ProfileCard>
                    <PersonalDetails></PersonalDetails>
                    <Address></Address>
                </div>
            </div>


            <div className="flex flex-col gap-3">
                <div className="w-fit h-fit px-3 py-2 bg-[#0560FD] text-white rounded-lg">
                    Other settings
                </div>
                <div className="w-full h-fit rounded-lg bg-white shadow-lg">
                    <ChangePassword></ChangePassword>
                    <AddUpiID></AddUpiID>
                    <AddPhone></AddPhone>
                    <SetTpin></SetTpin>
                    <ContactUs></ContactUs>
                    <Logout></Logout>
                </div>
            </div>
            
        </div>
    )
}



function CopyIcon(){
    return(
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 hover:stroke-blue-600 hover:cursor-pointer">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
        </svg>
    )
}