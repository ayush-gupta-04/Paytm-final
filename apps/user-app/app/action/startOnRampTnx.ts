'use server'
import { addMoneySchema } from "@repo/schema/zod";
import prisma from "@paytm-repo/db/client";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "../../lib/auth";
import axios from "axios";

type PaymentInfo = {
    amount : string,
    bankName : string,
    tokenUrl : string,
    bankUrl : string
}

export async function startOnRampTnx(data : PaymentInfo){
    const amount = Number(data.amount)*100;
    const session = await getServerSession(NEXT_AUTH)
    const success = addMoneySchema.safeParse({amount : data.amount,bankName  : data.bankName});
    if(session){
        if(success){
            try {
                const bankToken = await axios.post('http://localhost:3002/api/hdfc/gettoken',{
                    amount : amount,
                    webhookUrl : "http://localhost:3003/api/paytm/webhook",
                    userId : session.user.id
                })
                if(bankToken.data.token){
                    try {
                        const onRamp = await prisma.onRampTransaction.create({
                            data : {
                                status : "processing",
                                token : bankToken.data.token,
                                provider : data.bankName,
                                amount : amount,
                                startTime : new Date(),
                                userId : session.user.id
                            }
                        })
                        return{
                            success : true,
                            message : "Redirecting to payment page",
                            tnxToken : onRamp.token,
                            bankUrl : data.bankUrl
                        }
                    } catch (error) {
                        return{
                            success : false,
                            message : "Something went Down!"
                        }
                    }
                }else{
                    return{
                        success : false,
                        message : "Something wrong with the Bank server"
                    }
                }
            } catch (error) {
                return{
                    success : false,
                    message : "Something wrong with the Bank server"
                }
            }
        }else{
            return{
                success : false,
                message : "Invalid Inputs!"
            }
        }
    }else{
        return{
            success : false,
            message : "Unauthorised user"
        }
    }
}   