'use server'
import { changePassSchema } from "@repo/schema/zod";
import jwt, { JwtPayload } from "jsonwebtoken"
import prisma from "@paytm-repo/db/client"
import bcrypt from "bcrypt"

type ChangePassType = {
    password : string,
    confirmPass : string,
    userIdToken : string
}

export async function ChangePassword({password,confirmPass,userIdToken}: ChangePassType){
    const  userId  = jwt.verify(userIdToken,process.env.JWT_SECRET || "") as string;
    const format = changePassSchema.safeParse({password,confirmPass});
    if(format.success){
        const user = await prisma.user.findFirst({
            where : {
                id : userId
            }
        })
        if(user){
            const oldNewEqual = await bcrypt.compare(password,user.password);
            if(oldNewEqual){
                return{
                    success : false,
                    message : "New password should not match with the old Password"
                }
            }else{
                try {
                    const newPass = await bcrypt.hash(password,10);
                    const update = await prisma.user.update({
                        data : {
                            password : newPass
                        },
                        where : {
                            id : userId
                        }
                    })
                    if(update){
                        return{
                            success : true,
                            message : "Password changed Successfully"
                        }
                    }
                } catch (error) {
                    return{
                        success : false,
                        message : "Something went wrong!"
                    }
                }
            }
            return {
                success : false,
                message : "Invalid token error!"

            }
        }
    }else{
        return{
            success : false,
            message : "Password and Confirm Password should be same!"
        }
    }
}