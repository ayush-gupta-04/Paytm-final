import {AddMoney} from "../../../components/addmoney";
import {Balance} from "../../../components/balance";

export default function TransactionPage(){
    return(
        <div className="min-h-screen w-full">
            <div className="h-24 flex ">
                <header className="font-bold text-blue-500 text-5xl self-center ml-8">
                    Transaction
                </header>
            </div>
            <div className="grid grid-cols-2 h-full">
            <div className="p-4">
                <AddMoney></AddMoney>
            </div>
            <div className="p-4 flex flex-col gap-4">
                <Balance></Balance>
            </div>
        </div>
        </div>
    )
}