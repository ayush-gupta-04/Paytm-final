import { getServerSession } from "next-auth";
import OnRampTransactions from "../../../components/onramptransactions";
import { NEXT_AUTH } from "../../../lib/auth";
import prisma from "@paytm-repo/db/client";
import P2PTransactions from "../../../components/p2pTransactions";

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
    console.log(p2pTnx)
    return (
        <div className="w-full flex justify-center gap-6 py-10"> 
            <div className="w-5/12 bg-gray-100 rounded-lg  px-4 min-h-3/6 overflow-scroll py-4">
                <div className="h-16 flex items-center border-b border-slate-300">
                    <header className="text-3xl font-semibold text-gray-800 ">Bank onRamps</header>
                </div>
                <div className="my-4">
                    <OnRampTransactions onRampTnx={onRampTnx}></OnRampTransactions>
                </div>
            </div>
            <div className="w-5/12 bg-gray-100 rounded-lg  px-4 min-h-3/6 overflow-scroll">
                <div className="h-16 flex items-center border-b border-slate-300">
                    <header className="text-3xl font-semibold text-gray-800 ">Recent Transfers</header>
                </div>
                <div className="my-4">
                    <P2PTransactions p2pTnx={p2pTnx}></P2PTransactions>
                </div>
            </div>
        </div>
    )
}