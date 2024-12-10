import { getServerSession } from "next-auth"
import { NEXT_AUTH } from "../lib/auth"
import prisma from "@paytm-repo/db/client";
import { balanceAtom } from "@paytm-repo/store/atom";
import { useRecoilState } from "recoil";

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
        <div>
            <span className="bg-[#005EFF] px-3 py-2 rounded-lg text-white">
                Wallet Balance
            </span>
            <div className="w-full h-56 bg-white shadow-md grid grid-cols-3 mt-4 rounded-lg py-6">
                <div className="border-0 border-r-2 px-4">
                    <div className="font-medium text-md">
                        Total Balance
                    </div>
                    <div className="flex flex-row justify-center items-center h-full">
                        <div className="flex felx-row gap-2">
                            <div className="text-6xl">{balanceData.amount/100}</div>
                            <div className="self-end">INR</div>
                        </div>
                    </div>
                </div>
                <div className="border-0 border-r-2 px-4">
                    <div className="font-medium text-md">
                        Locked Balance
                    </div>
                    <div className="flex flex-row justify-center items-center h-full">
                        <div className="flex felx-row gap-2">
                            <div className="text-6xl">{balanceData.locked/100}</div>
                            <div className="self-end">INR</div>
                        </div>
                    </div>
                </div>
                <div className="px-4">
                    <div className="font-medium text-md">
                        Unlocked Balance
                    </div>
                    <div className="flex flex-row justify-center items-center h-full">
                        <div className="flex felx-row gap-2">
                            <div className="text-6xl">{balanceData.amount/100 - balanceData.locked/100}</div>
                            <div className="self-end">INR</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

