import { getServerSession } from "next-auth";
import OnRampTransactions from "../../../components/onramptransactions";
import { NEXT_AUTH } from "../../../lib/auth";
import prisma from "@paytm-repo/db/client";
import P2PTransactions from "../../../components/p2pTransactions";
import TransactionsWithFilter from "../../../components/transactions";

async function getOnRampTransactions(){
    const session =await getServerSession(NEXT_AUTH);
    if(!session || !session.user){
        return []
    }
    const userId = session?.user?.id;
    const data = await prisma.onRampTransaction.findMany({
        where : {
            userId : userId
        }
    })
    return data.map((tnx) => {
        return{
            time : tnx.startTime.toDateString() + " " + tnx.startTime.toLocaleTimeString(),
            amount : tnx.amount,
            status : tnx.status.toString(),
            provider : tnx.provider
        }
    })
}


async function getP2PTransactions(){
    const session =await getServerSession(NEXT_AUTH);
    if(!session || !session.user){
        return []
    }
    const userId = session?.user?.id;
    const data = await prisma.p2pTransfer.findMany({
        where : {
            OR : [
                {
                    fromUserId : userId
                },
                {
                    toUserId : userId
                }
            ]
        },
        include : {
            fromUser : {
                select : {
                    firstname : true,
                    lastname : true,
                    phone : true
                }
            },
            toUser : {
                select : {
                    firstname : true,
                    lastname : true,
                    phone : true
                }
            }
        }
    })
    console.log(data)
    return data.map((tnx) => {
        if(tnx.fromUserId == userId){
            return {
                send : true,
                name : tnx.toUser.firstname + " " + tnx.toUser.lastname,
                phone : tnx.toUser.phone,
                amount : tnx.amount,
                time : tnx.timestamp.toDateString() + " " + tnx.timestamp.toLocaleTimeString(),
            }
        }else{
            return {
                send : false,
                name : tnx.fromUser.firstname + " " + tnx.fromUser.lastname,
                phone : tnx.fromUser.phone,
                amount : tnx.amount,
                time : tnx.timestamp.toDateString() + " " + tnx.timestamp.toLocaleTimeString(),
            }
        }
    })
}




export default async function HistoryOfTransaction(){
    const onRampTnx = await getOnRampTransactions();
    const p2pTnx = await getP2PTransactions();
    return (
        <div className="min-h-screen w-full flex flex-col py-4 px-4 gap-8 bg-[#ECF5FC]"> 
            <div className="w-full h-10 shadow-sm bg-white rounded-md flex flex-row justify-between">
                <div className="self-center px-3 font-semibold">Your UPI ID</div>
                <div className="self-center px-3 flex flex-row gap-4">
                    <div className="text-green-600 font-semibold">7970566566@paytm</div>
                    <CopyIcon></CopyIcon>
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <div className="w-fit h-fit px-3 py-2 bg-[#0560FD] text-white rounded-lg">
                    Transaction history
                </div>
                <TransactionsWithFilter onRampTnx={onRampTnx} p2pTnx={p2pTnx}></TransactionsWithFilter>
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