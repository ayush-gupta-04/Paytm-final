'use server'
import  prisma  from "@paytm-repo/db/client";
import { signinSchema } from "@repo/schema/zod"

export async function LoginUser(data : {email : string , password : string}){
    const success = signinSchema.safeParse(data);
    if(success){
        try {
            const user = await prisma.user.findFirst({
                where : {
                    email : data.email
                }
            })
            if(user){
                if(!user.isEmailVerified){
                    return{
                        success : false,
                        message : "Email not verified!"
                    }
                }else{
                    return{
                        success : true,
                        message : "verified",
                    }
                }
            }else{
                return{
                    success : false,
                    message : "Wrong Credentials!"
                }
            }
        } catch (error) {
            return{
                success : false,
                message : "Something went wrong!"
            }
        }
    }
    else{
        return{
            success : false,
            message : "Invalid credentials!"
        }
    }
}