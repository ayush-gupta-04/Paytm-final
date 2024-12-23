import { getServerSession } from "next-auth";
import OnRampTransactions from "../../../components/onramptransactions";
import { NEXT_AUTH } from "../../../lib/auth";
import prisma from "@paytm-repo/db/client";
import P2PTransactions from "../../../components/p2pTransactions";
import TransactionsWithFilter from "../../../components/transactions";
import { tree } from "next/dist/build/templates/app-page";
import UpiHeading from "../../../components/upiheading";
type Transactions = {
    onRamp : boolean,
    send : boolean,
    time : string,
    amount : number,
    status : string,
    provider : string,
    timeInSeconds : string,
    transactionId : string,
    sender : {
        name : string | null,
        phone : string | null,
        upi : string | null
    },
    receiver : {
        name : string | null,
        phone : string | null,
        upi : string | null
    }
}
async function getOnRampTransactions(){
    const session = await getServerSession(NEXT_AUTH);
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
            onRamp : true,
            send : false,
            p2p : false,
            time : tnx.startTime.toDateString() + " " + tnx.startTime.toLocaleTimeString(),
            amount : tnx.amount,
            status : tnx.status.toString(),
            provider : tnx.provider,
            transactionId : tnx.id,
            timeInSeconds : tnx.startTime.getTime(),
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
        select : {
            fromUser : {
                select : {
                    firstname : true,
                    lastname : true,
                }
            },
            toUser : {
                select : {
                    firstname : true,
                    lastname : true,
                }
            },
            fromUserPhone : true,
            fromUserUpi : true,
            toUserPhone : true,
            toUserUpi : true,
            fromUserId : true,
            toUserId : true,
            timestamp : true,
            amount : true,
            id : true,
        }
    })

    return data.map((tnx) => {
        if(tnx.fromUserId == userId){
            return {
                onRamp : false,
                p2p : true,
                send : true,
                transactionId : tnx.id,
                sender : {
                    name : tnx.fromUser.firstname + " " + tnx.fromUser.lastname,
                    phone : tnx.fromUserPhone,
                    upi : tnx.fromUserUpi
                },
                receiver : {
                    name : tnx.toUser.firstname + " " + tnx.toUser.lastname,
                    phone : tnx.toUserPhone,
                    upi : tnx.toUserUpi
                },
                amount : tnx.amount,
                time : tnx.timestamp.toDateString() + " " + tnx.timestamp.toLocaleTimeString(),
                timeInSeconds : tnx.timestamp.getTime(),
            }
        }else{
            return {
                onRamp : false,
                p2p : true,
                send : false,
                transactionId : tnx.id,
                sender : {
                    name : tnx.fromUser.firstname + " " + tnx.fromUser.lastname,
                    phone : tnx.fromUserPhone,
                    upi : tnx.fromUserUpi
                },
                receiver : {
                    name : tnx.toUser.firstname + " " + tnx.toUser.lastname,
                    phone : tnx.toUserPhone,
                    upi : tnx.toUserUpi
                },
                amount : tnx.amount,
                time : tnx.timestamp.toDateString() + " " + tnx.timestamp.toLocaleTimeString(),
                timeInSeconds : tnx.timestamp.getTime(),
            }
        }
    })
}



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
export default async function HistoryOfTransaction(){
    const onRampTnx = await getOnRampTransactions();
    const p2pTnx = await getP2PTransactions();
    const transactions = [...onRampTnx,...p2pTnx].sort((a,b) => a.timeInSeconds - b.timeInSeconds);
    const initialUpi = await getUpi();
    
    return (
        <div className="h-full w-full flex flex-col py-4 px-4 gap-8 bg-[#ECF5FC] relative overflow-auto">
            <UpiHeading initialUpi={initialUpi}></UpiHeading>
            <div className="flex flex-col gap-3 h-full">
                <div className="w-fit h-fit px-3 py-2 bg-[#0560FD] text-white rounded-lg">
                    Transaction history
                </div>
                <TransactionsWithFilter transactions ={transactions} ></TransactionsWithFilter>
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