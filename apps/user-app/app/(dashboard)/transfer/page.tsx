import { getServerSession } from "next-auth";
import PayToPhone from "../../../components/payToPhone";
import PayToUpiId from "../../../components/payToUpi";
import UpiHeading from "../../../components/upiheading";
import { NEXT_AUTH } from "../../../lib/auth";
import prisma from "@paytm-repo/db/client";

async function getUpi(){
    const session = await getServerSession(NEXT_AUTH);
    if(!session){
        return null;
    }
    try {
        const data = await prisma.user.findFirst({
            where : {
                id : session.user.id
            },select : {
                upi : true
            }
        })
        if(!data){
            return null;
        }
        return data.upi;
    } catch (error) {
        return null;
    }
}
export default async function TransferPage(){
    const initialUpi = await getUpi();
    return(
        <div className="w-full h-full flex flex-col py-4 px-4 gap-8 bg-[#ECF5FC] relative">
            <UpiHeading initialUpi={initialUpi}></UpiHeading>
            <div className="flex flex-row gap-32 justify-center">
                <PayToPhone></PayToPhone>
                <PayToUpiId></PayToUpiId>
            </div>
            <img src="./paytmImg1.svg" alt="" className="w-4/5 self-center"/>
        </div>
    )
}
