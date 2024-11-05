'use server'
import  prisma  from "@paytm-repo/db/client";
import jwt, { JwtPayload } from "jsonwebtoken"

export async function verifyingEmailOtp(data : { otp : string, userIdToken : string }){
    try {
        const idOfUser = jwt.verify(data.userIdToken, process.env.JWT_SECRET || 'secret') as string;
        const currTime = Date.now() + 0 + "";
        if(idOfUser){
            try {
                const result = await prisma.user.findFirst({
                    where : {
                        id : idOfUser
                    }
                })
                if(result){
                    if(result.otpExpiry == null){
                        return{
                            success : false,
                            message : "Invalid Token Error.",
                        }
                    }else{
                        if(result.otpExpiry > currTime){
                            if(result.otp == data.otp){
                                try {
                                    const update = await prisma.user.update({
                                        data : {
                                            isEmailVerified : true
                                        },
                                        where : {
                                            id : idOfUser
                                        }
                                    })
                                    if(update){
                                        return{
                                            success : true,
                                            message : "Email Verified Successfully"
                                        }
                                    }
                                } catch (error) {
                                    return{
                                        success : false,
                                        message : "Resend otp and try again",
                                    }
                                }
                                
                            }else{
                                return{
                                    success : false,
                                    message : "Incorrect OTP",
                                } 
                            }
                        }else{
                            return{
                                success : false,
                                message : "OTP expired. Resend and try again!",
                            }
                        }
                    }
                }else{
                    return{
                        success : false,
                        message : "Invalid Token Error.",
                    }
                }
            } catch (error) {
                return{
                    success : false,
                    message : "Invalid Token Error.",
                }
            }
        }
    } catch (error) {
        return{
            success : false,
            message : "Invalid Token Error.",
        }
    }
}






export async function verifyingPassOtpForChangePass(data : { otp : string, userIdToken : string }){
    try {
        const idOfUser = jwt.verify(data.userIdToken, process.env.JWT_SECRET || 'secret') as string;
        const currTime = Date.now() + 0 + "";
        if(idOfUser){
            try {
                const result = await prisma.user.findFirst({
                    where : {
                        id : idOfUser
                    }
                })
                if(result){
                    if(result.otpExpiry == null){
                        return{
                            success : false,
                            message : "Invalid Token Error.",
                        }
                    }else{
                        if(!result.isEmailVerified){
                            return{
                                success : false,
                                message : "Email not Verified"
                            }
                        }
                        if(result.otpExpiry > currTime){
                            if(result.otp == data.otp){
                                return{
                                    success : true,
                                    message : "Otp Verified Successfully now proceed to change password",
                                    userIdToken : data.userIdToken
                                } 
                            }else{
                                return{
                                    success : false,
                                    message : "Incorrect OTP",
                                }
                            }
                        }else{
                            return{
                                success : false,
                                message : "OTP expired. Resend and try again!",
                            }
                        }
                    }
                }else{
                    return{
                        success : false,
                        message : "Invalid Token Error.",
                    }
                }
            } catch (error) {
                return{
                    success : false,
                    message : "Invalid Token Error.",
                }
            }
        }
    } catch (error) {
        return{
            success : false,
            message : "Invalid Token Error.",
        }
    }
}