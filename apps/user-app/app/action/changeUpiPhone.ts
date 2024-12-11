'use server'
import { AddUpiFormat, AddUpiSchema } from "@repo/schema/zod";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "../../lib/auth";
import prisma from "@paytm-repo/db/client";

export async function addUpiIdAction(data : AddUpiFormat){
    const session = await getServerSession(NEXT_AUTH);
    const format = AddUpiSchema.safeParse(data);
    if(!session){
        return{
            success: false,
            message : "Invalid token!"
        }
    }
    if(format.success){
        const userId : string = session?.user.id;
        try {
            const alreadyExist = await prisma.user.findFirst({
                where : {
                    upi : data.upi
                }
            })
            if(alreadyExist){
                return{
                    success : false,
                    message : "UPI ID already taken"
                }
            }else{
                try {
                    await prisma.user.update({
                        where : {
                            id : userId
                        },
                        data : {
                            upi : data.upi
                        }
                    })
                    return{
                        success : true,
                        message : "UPI ID added successfully"
                    }
                } catch (error) {
                    return{
                        success : false,
                        message : "Somethings is down!"
                    }
                }
            }
        } catch (error) {
            return{
                success : false,
                message : "Somethings is down!"
            }
        }
    }else{
        return{
            success : false,
            message : "Invalid format!!"
        }
    }
}