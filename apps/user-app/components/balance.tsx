import { getServerSession } from "next-auth"
import { NEXT_AUTH } from "../lib/auth"
import prisma from "@paytm-repo/db/client";

async function getBalance(){
    const session = await getServerSession(NEXT_AUTH);
    console.log(session)
    const balance = await prisma.balance.findFirst({
        where: {
            userId: (session?.user?.id)
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}

export async function Balance(){
    
    const balanceData = await getBalance();

    return(
        <div className="w-full px-4 py-6 flex flex-col bg-gray-100 rounded-lg">
            <div className="h-12 flex items-center border-b border-slate-300">
                <header className="text-xl font-semibold text-gray-800">
                    Balance
                </header>
            </div>
            <div className="flex flex-row justify-between h-12 items-center font-semibold text-gray-700 border-b border-slate-300">
                <div>Unlocked Balance</div>
                <div>INR {balanceData.amount/100}</div>
            </div>
            <div className="flex flex-row justify-between h-12 items-center font-semibold text-gray-700 border-b border-slate-300">
                <div>Total Locked Balance</div>
                <div>INR {balanceData.locked/100}</div>
            </div>
            <div className="flex flex-row justify-between h-12 items-center font-semibold text-gray-700">
                <div>Total Balance</div>
                <div>INR {balanceData.locked/100 + balanceData.amount/100}</div>
            </div>
        </div>
    )
}