'use server'
import  prisma  from "@paytm-repo/db/client";
import jwt, { JwtPayload } from "jsonwebtoken"
import { sendMail } from "../../lib/mail";

export async function resendOTPForEmailVerification({userIdToken} : {userIdToken : string}){
    const idOfUser = jwt.verify(userIdToken, process.env.JWT_SECRET || '') as string;
    try {
        const existUser = await prisma.user.findFirst({
            where : {
                id : idOfUser
            }
        })
        if(existUser && existUser.isEmailVerified){
            return{
                success : false,
                message : "Email already verified"
            }
        }
        if(existUser && !existUser.isEmailVerified){
            var randomOtp = '';
            for(var i = 0 ; i < 6 ; i++){
                randomOtp += Math.floor(Math.random()*10);
            }
            const expTime = Date.now() + 5*60*1000 + '';
            const update = await prisma.user.update({
                data : {
                    otp : randomOtp,
                    otpExpiry : expTime
                },
                where : {
                    id : idOfUser
                }
            })
            const result = await sendMail({email : update.email,otp : randomOtp})
            if(result.accepted){
                return{
                    success : true,
                    message : "OTP send to email",
                }
            }else{
                return{
                    success : false,
                    message : "Something went wrong",
                }
            }
        }
        else{
            return{
                success : false,
                message : "Invalid token error"
            } 
        }
    } catch (error) {
        return{
            success : false,
            message : "Invalid token error"
        }
    }

}



export async function resendOTPForPassChange({userId} : {userId : string}){
    const idOfUser = jwt.verify(userId, process.env.JWT_SECRET || '') as string;
    try {
        const existUser = await prisma.user.findFirst({
            where : {
                id : idOfUser
            }
        })
        if(existUser && !existUser.isEmailVerified){
            return{
                success : false,
                message : "Email not verified"
            }
        }
        if(existUser && existUser.isEmailVerified){
            var randomOtp = '';
            for(var i = 0 ; i < 6 ; i++){
                randomOtp += Math.floor(Math.random()*10);
            }
            const expTime = Date.now() + 5*60*1000 + '';
            const update = await prisma.user.update({
                data : {
                    otp : randomOtp,
                    otpExpiry : expTime
                },
                where : {
                    id : idOfUser
                }
            })
            const result = await sendMail({email : update.email,otp : randomOtp})
            if(result.accepted){
                return{
                    success : true,
                    message : "OTP send to email",
                }
            }else{
                return{
                    success : false,
                    message : "Something went wrong",
                }
            }
        }
        else{
            return{
                success : false,
                message : "Invalid token error"
            } 
        }
    } catch (error) {
        return{
            success : false,
            message : "Invalid token error"
        }
    }

}