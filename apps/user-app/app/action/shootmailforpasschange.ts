'use server'
import  prisma  from "@paytm-repo/db/client";
import { emailSchema } from "@repo/schema/zod";
import { sendMail } from "../../lib/mail";
import jwt from "jsonwebtoken"


export async function ShootMailForPassChange(data : {email : string}){
    const success = emailSchema.safeParse(data);
    if(success){
        try {
            const user = await prisma.user.findFirst({
                where : {
                    email : data.email
                }
            })
            if(user){
                if(user.isEmailVerified){
                    var randomOtp = '';
                    for(var i = 0 ; i < 6 ; i++){
                        randomOtp += Math.floor(Math.random()*10);
                    }
                    const expTime = Date.now() + 5*60*1000 + '';
                    await prisma.user.update({
                        data : {
                            otp : randomOtp,
                            otpExpiry : expTime
                        },
                        where : {
                            id : user.id
                        }
                    })
                    const token = jwt.sign(user.id,process.env.JWT_SECRET || '');
                    //send email
                    const result = await sendMail({email : user.email,otp : randomOtp})
                    if(result.accepted){
                        return{
                            success : true,
                            message : "OTP send to email",
                            userIdToken : token
                        }
                    }else{
                        return{
                            success : false,
                            message : "Something went wrong!",
                        }
                    }
                }else{
                    return{
                        success : false,
                        message : "Email not verified!",
                    }
                }
            }else{
                return{
                    success : false,
                    message : "Email doesn't exist!"
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
            message : "Invalid email!"
        }
    }
}