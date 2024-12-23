'use client'
import { transactionAtom } from "@paytm-repo/store/atom";
import { useEffect, useMemo, useState } from "react"
import { useRecoilState, useSetRecoilState } from "recoil";
type onRampTnx = {
    onRamp: boolean;
    send: boolean;
    p2p : boolean;
    time: string;
    amount: number;
    status: string;
    provider: string;
    timeInSeconds: number;
} 

type p2pTnx = {
    onRamp: boolean;
    send: boolean;
    p2p : boolean;
    transactionId: string;
    sender: {
        name: string;
        phone: string | null;
        upi: string | null;
    };
    receiver: {
        name: string;
        phone: string | null;
        upi: string | null;
    };
    amount: number;
    time: string;
    timeInSeconds: number;
    
}

type CombinedTransactions = p2pTnx | onRampTnx
function isTypeP2P(item : p2pTnx | onRampTnx) : item is p2pTnx{
    return (item as p2pTnx).p2p
}
function isTypeOnRamp(item : p2pTnx | onRampTnx) : item is onRampTnx{
    return (item as onRampTnx).onRamp
}


export default function TransactionsWithFilter({transactions} : {transactions : CombinedTransactions[]}){
    const[hide,setHide] = useState(true);
    const[showTnx,setShowTnx] = useState(false);
    const[transactionsState,setTransactionState] = useRecoilState(transactionAtom)
    useEffect(() => {
        //if no filter is open || initial render --> then set transactionsState to the server fetched values
        if(transactionsState == null || hide){
            setTransactionState(transactions);
        }
    },[hide])
    return(
        <div className={`w-full duration-300 flex flex-row justify-between relative h-[625px]`}>
            <div className={`${hide?"w-full":"w-3/4 mr-4"} duration-300 transition-all rounded-lg py-4 px-4 h-full bg-white shadow-xl`}>
                <div className="py-2 flex justify-between items-center border-b-2 z-30 sticky">
                    <div className="text-xl font-medium"> Transactions</div>
                    <div className="bg-[#07CBFD] mx-4 px-6 py-1 rounded-lg" onClick={() => {setHide(!hide)}}> filter</div>
                </div>
                <div className="my-2 h-[530px] overflow-auto">
                <BackgroundSupporter hide = {!showTnx}></BackgroundSupporter>
                    {transactionsState && transactionsState.map((tnx,id) => {
                        if(isTypeOnRamp(tnx)){
                            return (
                                <div className="w-full min-h-fit flex flex-col  px-3 py-2 hover:bg-slate-100" key={id+""} >
                                    <div className="flex flex-row justify-between">
                                        <div className="font-medium">{tnx.provider}</div>
                                        <div className="text-lg font-medium"> + {tnx.amount/100}</div>
                                    </div>
                                    <div className="flex flex-row justify-between">
                                        <div className="text-slate-600">{tnx.time}</div>
                                        <div className={`${tnx.status == "success"?"text-green-600":`${tnx.status == "processing"?"text-yellow-700":"text-red-700"}`}`}>{tnx.status}</div>
                                    </div>
                                </div>
                            )
                        }else if (isTypeP2P(tnx)){
                            return(
                                <div className="w-full min-h-fit flex flex-col px-3 py-2 hover:bg-slate-100" key={id+""} onClick={() => {setShowTnx(true)}}>
                                    <div className="flex flex-row justify-between">
                                        <div className="font-medium">{tnx.send?`Send to : ${tnx.receiver.name}`:`Received from : ${tnx.sender.name}`}</div>
                                    <div className={`text-lg font-medium`}>{tnx.send?`- ${tnx.amount/100}`:`+ ${tnx.amount/100}`}</div>
                                    </div>
                                    <div className="flex flex-row justify-between">
                                        <div className="text-slate-600">{tnx.time}</div>
                                        <div className="text-green-700">{tnx.send?`sent successfully`:`received successfully`}</div>
                                    </div>
                                    {showTnx && <P2PTnxDetails amount = {tnx.amount/100} sender = {tnx.sender} receiver = {tnx.receiver} send = {tnx.send} tnxId = {tnx.transactionId} time = {tnx.time} show = {showTnx}></P2PTnxDetails>}
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
            <Filter hide = {hide} transactions = {transactions}></Filter>
        </div>
    )
}

function BackgroundSupporter({hide} : {hide : boolean}){
    return(
        <div className={`w-screen fixed z-10 top-1/2 left-1/2 transition-all -translate-x-1/2 -translate-y-1/2 h-full duration-300 ${hide?"opacity-0 pointer-events-none":"opacity-100 backdrop-brightness-50"}`} onClick={(e) => {e.stopPropagation()}}>  
        </div>
    )
}


function FilterIcon(){
    return(
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
</svg>

    )
}




function P2PTnxDetails({amount,sender,receiver,send,tnxId,time,show} : {amount : number,sender : {name : string,phone : string|null,upi : string | null},receiver : {name : string,phone : string|null,upi : string | null},send : boolean,tnxId : string,time : string,show : boolean}){
    return(
        <div className={`fixed z-20 transition-all top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-fit bg-white px-4 py-4`}>
            <div className="text-3xl font-medium text-center bg-red-200 py-2 border border-b-2">Payment Details</div>
            <div></div>
        </div>
    )
}


const  Filter = ({hide,transactions} : {hide : boolean,transactions : CombinedTransactions[]}) => {
    const[filter,setFilter] = useState("");
    const setTransactionState = useSetRecoilState(transactionAtom)
    useEffect(() => {
        if(filter == "sent"){
            const filterArray = transactions.filter((tnx) => {
                if(isTypeOnRamp(tnx)){
                    return false;
                }else if(isTypeP2P(tnx)){
                    return tnx.send;
                }
            })
            setTransactionState(filterArray);
        }else if(filter == "received"){
            const filterArray = transactions.filter((tnx) => {
                if(isTypeOnRamp(tnx)){
                    return false;
                }else if(isTypeP2P(tnx)){
                    return !tnx.send;
                }
            })
            setTransactionState(filterArray);
        }else if (filter == "added" || filter == "sweeper"){
            const filterArray = transactions.filter((tnx) => {
                if(isTypeOnRamp(tnx)){
                    return true;
                }else if(isTypeP2P(tnx)){
                    return false
                }
            })
            setTransactionState(filterArray);
        }else if (filter == "successful"){
            const filterArray = transactions.filter((tnx) => {
                if(isTypeOnRamp(tnx)){
                    return tnx.status == "success"
                }else if(isTypeP2P(tnx)){
                    return true
                }
            })
            setTransactionState(filterArray);
        }else if (filter == "failed"){
            const filterArray = transactions.filter((tnx) => {
                if(isTypeOnRamp(tnx)){
                    return tnx.status == "faliure"
                }else if(isTypeP2P(tnx)){
                    return false
                }
            })
            setTransactionState(filterArray);
        }else if (filter == "processing"){
            const filterArray = transactions.filter((tnx) => {
                if(isTypeOnRamp(tnx)){
                    return tnx.status == "processing"
                }else if(isTypeP2P(tnx)){
                    return false
                }
            })
            setTransactionState(filterArray);
        }
        //TODO : time filter

    },[filter])
    return(
        <span className={` bg-white transition-all rounded-lg py-4 px-4 duration-300 ${hide?"w-0 scale-x-0 pointer-events-none":"scale-x-100 w-1/4"}`}>
            <div className="py-2 flex justify-between items-center border-b-2">
                <div className="text-xl font-medium"> Filter</div>
                <div className=" px-4 py-1 rounded-lg text-[#07CBFD]"> {FilterIcon()}</div>
            </div>
            <div className="flex flex-col py-2">
                <div >
                    <div className="text-lg hover:bg-slate-200 px-3 py-2">Time</div>
                    <div className="flex flex-row justify-start gap-3 px-4 py-1 hover:bg-slate-100">
                        <input type="radio" defaultValue="1" id="sent" name="radio" onChange={(e) => {setFilter(e.target.value)}}/>
                        <label>1 months</label>
                    </div>
                    <div className="flex flex-row justify-start gap-3 px-4 py-1 hover:bg-slate-100">
                        <input type="radio" defaultValue="3" id="sent" name="radio" onChange={(e) => {setFilter(e.target.value)}}/>
                        <label>3 months</label>
                    </div>
                    <div className="flex flex-row justify-start gap-3 px-4 py-1 hover:bg-slate-100">
                        <input type="radio" defaultValue="6" id="sent" name="radio" onChange={(e) => {setFilter(e.target.value)}}/>
                        <label>6 months</label>
                    </div>
                </div>
                <div>
                    <div className="text-lg hover:bg-slate-200 px-3 py-2">Categories</div>
                    {/*Make sure the linked radio buttons have the same value for their name HTML attribute. */}
                    <div>
                        
                        <div className="flex flex-row justify-start gap-3 px-4 py-1 hover:bg-slate-100">
                            <input type="radio" defaultValue="sent" id="sent" name="radio" onChange={(e) => {setFilter(e.target.value)}}/>
                            <label>Sent</label>
                        </div>
                        <div className="flex flex-row justify-start gap-3 px-4 py-1 hover:bg-slate-100">
                            <input type="radio" defaultValue="received" id="sent" name="radio" onChange={(e) => {setFilter(e.target.value)}}/>
                            <label>Received</label>
                        </div>
                        <div className="flex flex-row justify-start gap-3 px-4 py-1 hover:bg-slate-100">
                            <input type="radio" defaultValue="added" id="sent" name="radio" onChange={(e) => {setFilter(e.target.value)}}/>
                            <label>Added to wallet</label>
                        </div>
                        <div className="flex flex-row justify-start gap-3 px-4 py-1 hover:bg-slate-100">
                            <input type="radio" defaultValue="sweeper" id="sent" name="radio" onChange={(e) => {setFilter(e.target.value)}}/>
                            <label>Sweeped from wallet</label>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="text-lg hover:bg-slate-200 px-3 py-2">Status</div>
                    <div className="flex flex-row justify-start gap-3 px-4 py-1 hover:bg-slate-100">
                        <input type="radio" defaultValue="successful" id="sent" name="radio" onChange={(e) => {setFilter(e.target.value)}}/>
                        <label>Successful</label>
                    </div>
                    <div className="flex flex-row justify-start gap-3 px-4 py-1 hover:bg-slate-100">
                        <input type="radio" defaultValue="failed" id="sent" name="radio" onChange={(e) => {setFilter(e.target.value)}}/>
                        <label>Failed</label>
                    </div>
                    <div className="flex flex-row justify-start gap-3 px-4 py-1 hover:bg-slate-100">
                        <input type="radio" defaultValue="processing" id="sent" name="radio" onChange={(e) => {setFilter(e.target.value)}}/>
                        <label>Processing</label>
                    </div>
                </div>
            </div>
        </span>
    )
}