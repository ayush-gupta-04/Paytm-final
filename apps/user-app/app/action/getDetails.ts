'use server'
import { phoneFormat, phoneSchema } from "@repo/schema/zod";
import prisma from "@paytm-repo/db/client";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "../../lib/auth";

export async function getDetailsOfPhone(data : phoneFormat){
    const format = phoneSchema.safeParse(data);
    const session = await getServerSession(NEXT_AUTH);
    if(!session){
        return{
            success : false,
            message : "Invaild token error!"
        }
    }
    
    if(format.success){
        try {
            const me = await prisma.user.findFirst({
                where : {
                    email : session.user.email
                }
            })
            if(!me){
                return{
                    success : false,
                    message : "Invalid token error!"
                }
            }
            try {
                const user = await prisma.user.findFirst({
                    where : {
                        AND : [
                            {
                                phone : data.phone
                            },
                            {
                                NOT : {
                                    phone : me.phone
                                }
                            }
                        ]
                    }
                })
                if(user && user.isEmailVerified){
                    return {
                        success : true,
                        message : "verified",
                        name : user.firstname + " " + user.lastname
                    }
                }else{
                    return {
                        success : false,
                        message : 'No user found'
                    }
                }
            } catch (error) {
                return {
                    success : false,
                    message : 'Something went down!'
                }
            }
        } catch (error) {
            return{
                success : false,
                message : "Invalid token error!"
            }
        }
        
    }else{
        return{
            success : false,
            message : "Invalid input!"
        }
    }
}